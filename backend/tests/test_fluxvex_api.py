"""Fluxvex API + SEO static asset tests."""
import os
import re
import json
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://spec-landing-3.preview.emergentagent.com").rstrip("/")
# Load backend env for Mongo verification
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path("/app/backend/.env"))
from pymongo import MongoClient
mongo = MongoClient(os.environ["MONGO_URL"])
db = mongo[os.environ["DB_NAME"]]


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ------------- Waitlist -------------

class TestWaitlist:
    def test_valid_submission_and_persisted(self, client):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        r = client.post(f"{BASE_URL}/api/waitlist", json={
            "email": email, "agency_name": "TEST Agency",
            "channels": ["Google Ads", "Meta"], "clients": "1-10",
            "interest": "monthly", "source": "pytest"
        })
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["duplicate"] is False
        # Verify persisted in Mongo
        doc = db.waitlist.find_one({"email": email})
        assert doc is not None
        assert doc["agency_name"] == "TEST Agency"
        db.waitlist.delete_one({"email": email})

    def test_duplicate_dedupe(self, client):
        email = f"dup_{uuid.uuid4().hex[:8]}@example.com"
        r1 = client.post(f"{BASE_URL}/api/waitlist", json={"email": email, "agency_name": "A1"})
        assert r1.status_code == 200
        assert r1.json()["duplicate"] is False
        r2 = client.post(f"{BASE_URL}/api/waitlist", json={"email": email, "agency_name": "A2"})
        assert r2.status_code == 200
        assert r2.json()["duplicate"] is True
        # Exactly 1 doc in Mongo
        count = db.waitlist.count_documents({"email": email})
        assert count == 1
        db.waitlist.delete_one({"email": email})

    def test_invalid_email(self, client):
        r = client.post(f"{BASE_URL}/api/waitlist", json={"email": "not-an-email"})
        assert r.status_code == 400

    def test_honeypot_trap(self, client):
        email = f"trap_{uuid.uuid4().hex[:8]}@example.com"
        r = client.post(f"{BASE_URL}/api/waitlist", json={"email": email, "trap": "bot"})
        assert r.status_code == 200
        assert db.waitlist.find_one({"email": email}) is None


# ------------- Contact -------------

class TestContact:
    def test_contact_submission(self, client):
        email = f"contact_{uuid.uuid4().hex[:8]}@example.com"
        r = client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST User", "email": email, "message": "Hello this is a test message."
        })
        assert r.status_code == 200, r.text
        assert r.json()["ok"] is True
        doc = db.contact_messages.find_one({"email": email})
        assert doc is not None
        assert doc["name"] == "TEST User"
        db.contact_messages.delete_one({"email": email})

    def test_contact_invalid_email(self, client):
        r = client.post(f"{BASE_URL}/api/contact", json={
            "name": "x", "email": "bad", "message": "m"
        })
        assert r.status_code == 400


# ------------- Careers -------------

class TestCareers:
    def test_valid_submission_persisted(self, client):
        email = f"career_{uuid.uuid4().hex[:8]}@testflix.dev"
        payload = {
            "name": "TEST Careers User",
            "email": email,
            "role": "saas-sales-intern",
            "portfolio": "https://example.com",
            "message": "I would love to join Fluxvex because this is a legit test message over twenty chars.",
        }
        r = client.post(f"{BASE_URL}/api/careers", json=payload)
        assert r.status_code == 200, r.text
        assert r.json()["ok"] is True
        doc = db.career_applications.find_one({"email": email})
        assert doc is not None
        assert doc["role"] == "saas-sales-intern"
        assert doc["name"] == "TEST Careers User"
        db.career_applications.delete_one({"email": email})

    def test_short_message_rejected(self, client):
        r = client.post(f"{BASE_URL}/api/careers", json={
            "name": "TEST x", "email": f"short_{uuid.uuid4().hex[:6]}@testflix.dev",
            "role": "saas-sales-intern", "message": "too short",
        })
        assert r.status_code == 400
        assert "20" in r.json().get("detail", "") or "least" in r.json().get("detail", "").lower()

    def test_invalid_email_rejected(self, client):
        r = client.post(f"{BASE_URL}/api/careers", json={
            "name": "x", "email": "bad", "role": "saas-sales-intern",
            "message": "Valid long enough message here for test purposes.",
        })
        assert r.status_code == 400

    def test_honeypot(self, client):
        email = f"trap_{uuid.uuid4().hex[:8]}@testflix.dev"
        r = client.post(f"{BASE_URL}/api/careers", json={
            "name": "x", "email": email, "role": "saas-sales-intern",
            "message": "Valid long enough message here for test purposes.",
            "trap": "bot",
        })
        assert r.status_code == 200
        assert db.career_applications.find_one({"email": email}) is None


# ------------- SEO Static Assets -------------

class TestSeo:
    def test_index_html_canonical_og(self, client):
        r = client.get(f"{BASE_URL}/")
        assert r.status_code == 200
        html = r.text
        assert '<link rel="canonical" href="https://www.fluxvex.com/"' in html
        assert 'og:url' in html and 'https://www.fluxvex.com' in html
        assert 'https://www.fluxvex.com/og-image.jpg' in html
        assert 'summary_large_image' in html

    def test_jsonld_no_price_rating(self, client):
        r = client.get(f"{BASE_URL}/")
        html = r.text
        # Extract JSON-LD blocks
        blocks = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL)
        assert len(blocks) > 0
        for b in blocks:
            parsed = json.loads(b)  # must be valid JSON
            raw = b.lower()
            assert 'aggregaterating' not in raw
            assert '"review"' not in raw
            # pricing values should not appear
            for p in ['49', '149', '3999', '3,999', '11999', '11,999']:
                assert p not in raw, f"price {p} found in JSON-LD"

    def test_sitemap(self, client):
        r = client.get(f"{BASE_URL}/sitemap.xml")
        assert r.status_code == 200
        ct = r.headers.get("content-type", "")
        assert "xml" in ct
        urls = re.findall(r'<loc>([^<]+)</loc>', r.text)
        # Iteration 8: 4 pages + /careers + 3 integration pages + /blog + 12 blog posts = 21
        assert len(urls) == 21
        for u in urls:
            assert u.startswith("https://www.fluxvex.com")
        assert any(u.endswith("/blog") for u in urls)
        assert any(u.endswith("/careers") for u in urls)
        blog_posts = [u for u in urls if "/blog/" in u]
        assert len(blog_posts) == 12
        integration_pages = [u for u in urls if "/integrations/" in u]
        assert len(integration_pages) == 3

    def test_robots(self, client):
        r = client.get(f"{BASE_URL}/robots.txt")
        assert r.status_code == 200
        assert "text/plain" in r.headers.get("content-type", "")
        assert "Sitemap:" in r.text
        assert r.text.strip().splitlines()[-1].lower().startswith("sitemap:")

    def test_llms_txt(self, client):
        r = client.get(f"{BASE_URL}/llms.txt")
        assert r.status_code == 200
        assert "text/plain" in r.headers.get("content-type", "")
        body = r.text.lower()
        for p in ['$49', '$149', '3,999', '11,999']:
            assert p.lower() not in body, f"price {p} found in llms.txt"
        # locked story mentioned
        assert 'locked' in body and 'waitlist' in body
        # Iteration 3: 6 pages listed incl. legal drafts
        assert '/privacy-policy' in body
        assert '/terms' in body
        assert 'draft' in body
        assert '/blog' in body

    def test_sitemap_excludes_legal_drafts(self, client):
        r = client.get(f"{BASE_URL}/sitemap.xml")
        body = r.text
        assert '/privacy-policy' not in body
        assert '/terms' not in body

    def test_jsonld_faq_matches_onpage_faq(self, client):
        """JSON-LD pricing FAQ answer must equal Faq.jsx on-page text exactly."""
        # Read Faq.jsx source answer
        faq_src = Path("/app/frontend/src/components/Faq.jsx").read_text()
        m = re.search(r'"When will pricing be available\?",\s*"([^"]+)"', faq_src)
        assert m, "pricing FAQ Q/A not found in Faq.jsx"
        onpage = m.group(1)
        # Fetch index.html JSON-LD
        html = client.get(f"{BASE_URL}/").text
        blocks = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL)
        found = False
        for b in blocks:
            data = json.loads(b)
            items = data if isinstance(data, list) else [data]
            # expand @graph
            expanded = []
            for d in items:
                expanded.append(d)
                expanded.extend(d.get("@graph") or [])
            for d in expanded:
                for q in (d.get("mainEntity") or []):
                    if q.get("name") == "When will pricing be available?":
                        ans = q["acceptedAnswer"]["text"]
                        assert ans == onpage, f"JSON-LD mismatch: {ans!r} vs {onpage!r}"
                        found = True
        assert found, "pricing FAQ not found in JSON-LD"
