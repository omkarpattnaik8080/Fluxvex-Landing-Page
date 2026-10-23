"""Tests for POST /api/partners (partner waitlist)."""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://spec-landing-3.preview.emergentagent.com").rstrip("/")
PARTNERS = f"{BASE_URL}/api/partners"

UNIQUE_EMAIL = f"qa-iter30-pytest-{int(time.time())}@test.local"


class TestPartners:
    def test_rejects_bad_email(self):
        r = requests.post(PARTNERS, json={"name": "Test User", "email": "not-an-email"})
        assert r.status_code == 400, r.text

    def test_rejects_empty_name(self):
        r = requests.post(PARTNERS, json={"name": "   ", "email": "ok@test.local"})
        assert r.status_code == 400, r.text

    def test_create_individual_success(self):
        payload = {"name": "QA Ind", "email": UNIQUE_EMAIL, "audience": "individual", "reach": "YT 5k"}
        r = requests.post(PARTNERS, json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["duplicate"] is False
        assert isinstance(data["position"], int) and data["position"] >= 1
        self.__class__.first_position = data["position"]

    def test_duplicate_keeps_same_position(self):
        payload = {"name": "QA Ind Dup", "email": UNIQUE_EMAIL, "audience": "individual"}
        r = requests.post(PARTNERS, json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["duplicate"] is True
        assert data["position"] == getattr(self.__class__, "first_position", data["position"])

    def test_agency_submission(self):
        email = f"qa-iter30-pytest-agy-{int(time.time())}@test.local"
        payload = {"name": "QA Agy", "email": email, "audience": "agency", "organization": "QA Agency", "reach": "6–15"}
        r = requests.post(PARTNERS, json=payload)
        assert r.status_code == 200, r.text
        assert r.json()["ok"] is True

    def test_honeypot_trap_skips(self):
        r = requests.post(PARTNERS, json={"name": "Bot", "email": "bot@test.local", "trap": "spam"})
        assert r.status_code == 200
        assert r.json().get("sheet_status") == "skipped"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
