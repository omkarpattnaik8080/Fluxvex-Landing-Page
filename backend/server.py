from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import time
import asyncio
import logging
from collections import defaultdict, deque
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timedelta, timezone
import bcrypt
import jwt
from uuid import uuid4


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
RATE_LIMIT = 10
RATE_WINDOW = 60.0
_rate_bucket = defaultdict(deque)


def _rate_ok(ip: str) -> bool:
    now = time.monotonic()
    bucket = _rate_bucket[ip]
    while bucket and now - bucket[0] > RATE_WINDOW:
        bucket.popleft()
    if len(bucket) >= RATE_LIMIT:
        return False
    bucket.append(now)
    return True


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


async def forward_to_sheets(sheet_name: str, headers: List[str], row: List[str]):
    """Optional Google Sheets sync. Configure GOOGLE_SHEETS_WEBAPP_URL (Apps Script
    webhook) to enable; submissions are always persisted to MongoDB first."""
    url = os.environ.get("GOOGLE_SHEETS_WEBAPP_URL")
    if not url:
        return "not_configured"
    try:
        import requests

        def _post():
            return requests.post(url, json={"sheet": sheet_name, "headers": headers, "row": row}, timeout=10)

        resp = await asyncio.to_thread(_post)
        return "synced" if resp.ok else f"http_{resp.status_code}"
    except Exception:
        return "error"


# ---------- Auth helpers (single-admin, JWT httpOnly cookie) ----------

JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": payload["sub"], "role": "admin"})
    if not user:
        raise HTTPException(status_code=401, detail="Admin not found")
    return {"id": payload["sub"], "email": payload.get("email", "")}


def _slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or str(uuid4())[:8]

# ---------- Models ----------

class LoginIn(BaseModel):
    email: str
    password: str


class JobCreate(BaseModel):
    title: str
    team: str = "Growth"
    location: str
    type: str
    ppo: str
    desc: str
    wants: List[str] = []


class JobUpdate(BaseModel):
    title: Optional[str] = None
    team: Optional[str] = None
    location: Optional[str] = None
    type: Optional[str] = None
    ppo: Optional[str] = None
    desc: Optional[str] = None
    wants: Optional[List[str]] = None
    active: Optional[bool] = None


class StatusCheck(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(__import__("uuid").uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class WaitlistCreate(BaseModel):
    email: str
    agency_name: str = ""
    clients: str = "Not sure"
    channels: List[str] = []
    interest: str = "Not sure yet"
    source: str = "site"
    trap: str = ""


class ContactCreate(BaseModel):
    name: str
    email: str
    agency: str = ""
    message: str
    trap: str = ""


class CareerApplicationCreate(BaseModel):
    name: str
    email: str
    role: str
    portfolio: str = ""
    message: str
    trap: str = ""


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Fluxvex API running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/waitlist")
async def join_waitlist(input: WaitlistCreate, request: Request):
    if not _rate_ok(request.client.host if request.client else "unknown"):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again shortly.")
    if input.trap:
        return {"ok": True, "duplicate": False, "sheet_status": "skipped"}
    email = input.email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid work email.")
    if len(email) > 254:
        raise HTTPException(status_code=400, detail="Please enter a valid work email.")

    existing = await db.waitlist.find_one({"email": email})
    created_at = existing["created_at"] if existing else _now_iso()
    doc = {
        "email": email,
        "agency_name": input.agency_name.strip()[:120],
        "clients": input.clients,
        "channels": input.channels[:8],
        "interest": input.interest,
        "source": input.source[:60],
        "created_at": created_at,
        "updated_at": _now_iso(),
    }
    await db.waitlist.update_one({"email": email}, {"$set": doc}, upsert=True)
    _waitlist_count_cache.pop("total", None)  # keep the live pulse + "You're #N" honest

    sheet_status = await forward_to_sheets(
        "Submissions",
        ["Timestamp", "Email", "Agency name", "Clients", "Channels", "Interest", "Source"],
        [created_at, email, doc["agency_name"], doc["clients"], ", ".join(doc["channels"]), doc["interest"], doc["source"]],
    )
    return {"ok": True, "duplicate": bool(existing), "sheet_status": sheet_status}


_waitlist_count_cache = {}


@api_router.get("/waitlist/count")
async def waitlist_count():
    """Public signup total for social proof. 60s in-memory cache so bursts never hammer Mongo."""
    now = time.time()
    cached = _waitlist_count_cache.get("total")
    if cached and now - cached[0] < 60:
        return {"count": cached[1]}
    total = await db.waitlist.count_documents({"email": {"$ne": ""}})
    _waitlist_count_cache["total"] = (now, total)
    return {"count": total}


@api_router.post("/contact")
async def submit_contact(input: ContactCreate, request: Request):
    if not _rate_ok(request.client.host if request.client else "unknown"):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again shortly.")
    if input.trap:
        return {"ok": True, "sheet_status": "skipped"}
    name = input.name.strip()
    email = input.email.strip().lower()
    message = input.message.strip()
    if not name or len(name) > 120:
        raise HTTPException(status_code=400, detail="Please enter your name.")
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid work email.")
    if not message or len(message) > 5000:
        raise HTTPException(status_code=400, detail="Please enter a message (up to 5000 characters).")

    doc = {
        "name": name,
        "email": email,
        "agency": input.agency.strip()[:120],
        "message": message,
        "created_at": _now_iso(),
    }
    await db.contact_messages.insert_one(doc)

    sheet_status = await forward_to_sheets(
        "Contact",
        ["Timestamp", "Name", "Email", "Agency", "Message"],
        [doc["created_at"], name, email, doc["agency"], message[:500]],
    )
    return {"ok": True, "sheet_status": sheet_status}


@api_router.post("/careers")
async def submit_career_application(input: CareerApplicationCreate, request: Request):
    if not _rate_ok(request.client.host if request.client else "unknown"):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again shortly.")
    if input.trap:
        return {"ok": True, "sheet_status": "skipped"}
    name = input.name.strip()
    email = input.email.strip().lower()
    role = input.role.strip()
    message = input.message.strip()
    if not name or len(name) > 120:
        raise HTTPException(status_code=400, detail="Please enter your name.")
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email.")
    if not role or len(role) > 120:
        raise HTTPException(status_code=400, detail="Please choose a role.")
    if not message or len(message) < 20:
        raise HTTPException(status_code=400, detail="Tell us a little more—why do you want to join Fluxvex? (at least 20 characters)")
    if len(message) > 5000:
        raise HTTPException(status_code=400, detail="Please keep your message under 5000 characters.")

    doc = {
        "name": name,
        "email": email,
        "role": role,
        "portfolio": input.portfolio.strip()[:300],
        "message": message,
        "created_at": _now_iso(),
    }
    await db.career_applications.insert_one(doc)

    sheet_status = await forward_to_sheets(
        "Careers",
        ["Timestamp", "Name", "Email", "Role", "Portfolio", "Message"],
        [doc["created_at"], name, email, role, doc["portfolio"], message[:500]],
    )
    return {"ok": True, "sheet_status": sheet_status}


# ---------- Admin auth ----------

LOCK_THRESHOLD = 5
LOCK_WINDOW_MIN = 15


@api_router.post("/auth/login")
async def admin_login(input: LoginIn, request: Request, response: Response):
    if not _rate_ok(request.client.host if request.client else "unknown"):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again shortly.")
    email = input.email.strip().lower()
    identifier = f"{request.client.host if request.client else 'unknown'}:{email}"
    now = datetime.now(timezone.utc)
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("locked_until") and datetime.fromisoformat(attempt["locked_until"]) > now:
        raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")
    user = await db.users.find_one({"email": email, "role": "admin"})
    if not user or not verify_password(input.password, user.get("password_hash", "")):
        fails = ((attempt or {}).get("fails", 0) or 0) + 1
        update = {"fails": fails}
        if fails >= LOCK_THRESHOLD:
            update["locked_until"] = (now + timedelta(minutes=LOCK_WINDOW_MIN)).isoformat()
            update["fails"] = 0
        await db.login_attempts.update_one({"identifier": identifier}, {"$set": update}, upsert=True)
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    await db.login_attempts.delete_one({"identifier": identifier})
    access = create_access_token(user["_id"], user["email"])
    refresh = create_refresh_token(user["_id"])
    response.set_cookie(key="access_token", value=access, httponly=True, secure=True, samesite="none", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    return {"ok": True, "email": user["email"], "role": "admin"}


@api_router.post("/auth/refresh")
async def admin_refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": payload["sub"], "role": "admin"})
    if not user:
        raise HTTPException(status_code=401, detail="Admin not found")
    access = create_access_token(user["_id"], user["email"])
    response.set_cookie(key="access_token", value=access, httponly=True, secure=True, samesite="none", max_age=900, path="/")
    return {"ok": True}


@api_router.post("/auth/logout")
async def admin_logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/")
    return {"ok": True}


@api_router.get("/auth/me")
async def admin_me(request: Request):
    return await get_current_admin(request)


# ---------- Job postings (admin-managed, public read) ----------

@api_router.get("/careers/jobs")
async def list_jobs(request: Request, all: bool = False):
    if all:
        await get_current_admin(request)
        cursor = db.job_postings.find({})
    else:
        cursor = db.job_postings.find({"active": True, "deleted": {"$ne": True}})
    items = await cursor.sort("created_at", 1).to_list(200)
    for d in items:
        d.pop("_id", None)
    return items


@api_router.post("/careers/jobs")
async def create_job(input: JobCreate, request: Request):
    await get_current_admin(request)
    title = input.title.strip()
    if not title or len(title) > 120:
        raise HTTPException(status_code=400, detail="Please enter a job title.")
    if not input.location.strip() or not input.type.strip():
        raise HTTPException(status_code=400, detail="Please enter a location and a program type.")
    if not input.ppo.strip():
        raise HTTPException(status_code=400, detail="Please describe the PPO offer.")
    if not input.desc.strip() or len(input.desc.strip()) < 20:
        raise HTTPException(status_code=400, detail="Please write a short description (at least 20 characters).")
    now = _now_iso()
    doc = {
        "id": str(uuid4()),
        "slug": _slugify(title),
        "title": title,
        "team": input.team.strip()[:60] or "Growth",
        "location": input.location.strip()[:120],
        "type": input.type.strip()[:120],
        "ppo": input.ppo.strip()[:200],
        "desc": input.desc.strip()[:1200],
        "wants": [w.strip()[:160] for w in input.wants if w.strip()][:6],
        "active": True,
        "created_at": now,
        "updated_at": now,
    }
    await db.job_postings.insert_one(dict(doc))
    return doc


@api_router.patch("/careers/jobs/{job_id}")
async def update_job(job_id: str, input: JobUpdate, request: Request):
    await get_current_admin(request)
    updates = {k: v for k, v in input.model_dump().items() if v is not None}
    if "title" in updates:
        title = updates.pop("title").strip()
        if not title or len(title) > 120:
            raise HTTPException(status_code=400, detail="Please enter a valid job title.")
        updates["title"] = title
        updates["slug"] = _slugify(title)
    if "wants" in updates:
        updates["wants"] = [w.strip()[:160] for w in updates["wants"] if w.strip()][:6]
    if not updates:
        raise HTTPException(status_code=400, detail="Nothing to update.")
    updates["updated_at"] = _now_iso()
    doc = await db.job_postings.find_one_and_update({"id": job_id}, {"$set": updates}, return_document=True)
    if not doc:
        raise HTTPException(status_code=404, detail="Job not found.")
    doc.pop("_id", None)
    return doc


@api_router.delete("/careers/jobs/{job_id}")
async def delete_job(job_id: str, request: Request):
    await get_current_admin(request)
    doc = await db.job_postings.find_one_and_update(
        {"id": job_id}, {"$set": {"active": False, "deleted": True, "updated_at": _now_iso()}}
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Job not found.")
    return {"ok": True}
SEED_JOBS = [
    {
        "slug": "saas-sales-intern",
        "title": "SaaS Sales Intern",
        "team": "Growth",
        "location": "Remote + Hybrid · Bengaluru, India",
        "type": "Unpaid internship · 4 months",
        "ppo": "Guaranteed PPO conversion chances—with a package up to ₹6 LPA",
        "desc": "Learn B2B SaaS sales on a product agencies genuinely need. Work the waitlist with the founding team, talk to agency owners, run demos, and turn interest into launch-day customers.",
        "wants": [
            "Clear, confident conversations—in English, on calls and in text",
            "Curiosity about how marketing agencies actually operate",
            "A bias for following up without being reminded",
        ],
    },
    {
        "slug": "saas-sales-us-markets-intern",
        "title": "SaaS Sales US Markets Intern",
        "team": "Growth",
        "location": "Remote · USA",
        "type": "Unpaid internship · 4 months",
        "ppo": "Guaranteed PPO conversion chances—with a package above market standards",
        "desc": "Own US-market conversations for a pre-launch SaaS: prospect agencies across US time zones, run discovery texts and calls, and feed real objections straight into the product.",
        "wants": [
            "Comfort selling into US time zones, text-first and call-ready",
            "Talent for turning a cold reply into a real conversation",
            "Interest in agencies, ad platforms, and reporting pain",
        ],
    },
    {
        "slug": "saas-sales-uk-markets-intern",
        "title": "SaaS Sales UK Markets Intern",
        "team": "Growth",
        "location": "Remote · UK",
        "type": "Unpaid internship · 4 months",
        "ppo": "Guaranteed PPO conversion chances—with a package above market standards",
        "desc": "Open up the UK market for Fluxvex: prospect and qualify UK agencies, run demos with the founding team, and build the playbook the whole company will use post-launch.",
        "wants": [
            "Fluent, professional communication tuned to UK business culture",
            "Self-directed outreach—you plan the week, you hit the targets",
            "Genuine interest in SaaS and the agency reporting workflow",
        ],
    },
]


@app.on_event("startup")
async def startup_seed():
    # Admin account — seeded once; if ADMIN_PASSWORD changes in .env, the stored hash is updated.
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email, "role": "admin"})
    if existing is None:
        await db.users.insert_one(
            {
                "_id": str(uuid4()),
                "email": admin_email,
                "password_hash": hash_password(admin_password),
                "name": "Admin",
                "role": "admin",
                "created_at": _now_iso(),
            }
        )
        logger.info("Seeded admin account: %s", admin_email)
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"_id": existing["_id"]}, {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info("Updated admin password hash from env")

    await db.login_attempts.create_index("identifier")

    # Perf: hot-path indexes (dedupe lookups, admin listings, public job fetch)
    await db.waitlist.create_index("email")
    await db.waitlist.create_index("created_at")
    await db.contact_messages.create_index("email")
    await db.contact_messages.create_index("created_at")
    await db.career_applications.create_index("email")
    await db.career_applications.create_index("created_at")
    await db.job_postings.create_index("slug")
    await db.job_postings.create_index("active")
    await db.users.create_index("email")

    # Seed the current job openings only when the collection is empty.
    if await db.job_postings.count_documents({}) == 0:
        now = _now_iso()
        await db.job_postings.insert_many(
            [
                {
                    **job,
                    "id": str(uuid4()),
                    "active": True,
                    "created_at": now,
                    "updated_at": now,
                }
                for job in SEED_JOBS
            ]
        )
        logger.info("Seeded %d job postings", len(SEED_JOBS))


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
