from fastapi import FastAPI, APIRouter, HTTPException, Request
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
from typing import List
from datetime import datetime, timezone


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


# ---------- Models ----------

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

    sheet_status = await forward_to_sheets(
        "Submissions",
        ["Timestamp", "Email", "Agency name", "Clients", "Channels", "Interest", "Source"],
        [created_at, email, doc["agency_name"], doc["clients"], ", ".join(doc["channels"]), doc["interest"], doc["source"]],
    )
    return {"ok": True, "duplicate": bool(existing), "sheet_status": sheet_status}


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


# Include the router in the main app
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
