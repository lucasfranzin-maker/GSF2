#!/usr/bin/env python3
"""
Backend API tests for GSF – Grafik Service Franzin
Tests all /api endpoints using the public preview URL
"""
import requests
import sys
from datetime import datetime

class GSFBackendTester:
    def __init__(self, base_url="https://distribution-de.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, passed, details=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ PASS: {name}")
        else:
            print(f"❌ FAIL: {name}")
        if details:
            print(f"   {details}")
        self.test_results.append({"name": name, "passed": passed, "details": details})

    def test_health_check(self):
        """Test GET /api/ returns online message"""
        print("\n🔍 Testing GET /api/ (health check)...")
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "online" in data["message"].lower():
                    self.log_test("GET /api/ health check", True, f"Response: {data}")
                    return True
                else:
                    self.log_test("GET /api/ health check", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("GET /api/ health check", False, f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("GET /api/ health check", False, f"Exception: {str(e)}")
            return False

    def test_contact_valid(self):
        """Test POST /api/contact with valid payload"""
        print("\n🔍 Testing POST /api/contact (valid payload)...")
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "name": f"Test User {timestamp}",
            "company": f"Test Company {timestamp}",
            "email": f"test{timestamp}@example.com",
            "phone": "+27 21 555 1234",
            "location": "Cape Town",
            "subject": "Test inquiry",
            "message": "This is a test message from automated testing.",
            "lang": "de"
        }
        try:
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=15)
            if response.status_code == 200:
                data = response.json()
                if data.get("ok") and "id" in data and "email_status" in data:
                    self.log_test("POST /api/contact (valid)", True, 
                                f"Created contact ID: {data['id']}, email_status: {data['email_status']}")
                    return data["id"]
                else:
                    self.log_test("POST /api/contact (valid)", False, f"Missing fields in response: {data}")
                    return None
            else:
                self.log_test("POST /api/contact (valid)", False, 
                            f"Status {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_test("POST /api/contact (valid)", False, f"Exception: {str(e)}")
            return None

    def test_contact_missing_name(self):
        """Test POST /api/contact with missing name (should return 422)"""
        print("\n🔍 Testing POST /api/contact (missing name)...")
        payload = {
            "company": "Test Company",
            "email": "test@example.com",
            "message": "Test message"
        }
        try:
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            if response.status_code == 422:
                self.log_test("POST /api/contact (missing name → 422)", True, 
                            f"Correctly rejected with 422")
                return True
            else:
                self.log_test("POST /api/contact (missing name → 422)", False, 
                            f"Expected 422, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("POST /api/contact (missing name → 422)", False, f"Exception: {str(e)}")
            return False

    def test_contact_missing_company(self):
        """Test POST /api/contact with missing company (should return 422)"""
        print("\n🔍 Testing POST /api/contact (missing company)...")
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Test message"
        }
        try:
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            if response.status_code == 422:
                self.log_test("POST /api/contact (missing company → 422)", True, 
                            f"Correctly rejected with 422")
                return True
            else:
                self.log_test("POST /api/contact (missing company → 422)", False, 
                            f"Expected 422, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("POST /api/contact (missing company → 422)", False, f"Exception: {str(e)}")
            return False

    def test_contact_missing_message(self):
        """Test POST /api/contact with missing message (should return 422)"""
        print("\n🔍 Testing POST /api/contact (missing message)...")
        payload = {
            "name": "Test User",
            "company": "Test Company",
            "email": "test@example.com"
        }
        try:
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            if response.status_code == 422:
                self.log_test("POST /api/contact (missing message → 422)", True, 
                            f"Correctly rejected with 422")
                return True
            else:
                self.log_test("POST /api/contact (missing message → 422)", False, 
                            f"Expected 422, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("POST /api/contact (missing message → 422)", False, f"Exception: {str(e)}")
            return False

    def test_contact_invalid_email(self):
        """Test POST /api/contact with invalid email (should return 422)"""
        print("\n🔍 Testing POST /api/contact (invalid email)...")
        payload = {
            "name": "Test User",
            "company": "Test Company",
            "email": "not-an-email",
            "message": "Test message"
        }
        try:
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            if response.status_code == 422:
                self.log_test("POST /api/contact (invalid email → 422)", True, 
                            f"Correctly rejected with 422")
                return True
            else:
                self.log_test("POST /api/contact (invalid email → 422)", False, 
                            f"Expected 422, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("POST /api/contact (invalid email → 422)", False, f"Exception: {str(e)}")
            return False

    def test_admin_login_valid(self):
        """Test POST /api/admin/login with correct token returns {ok:true}"""
        print("\n🔍 Testing POST /api/admin/login (valid token)...")
        try:
            response = requests.post(
                f"{self.api_url}/admin/login",
                headers={"X-Admin-Token": "gsf-admin-2026"},
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get("ok") is True:
                    self.log_test("POST /api/admin/login (valid token → 200)", True, 
                                f"Response: {data}")
                    return True
                else:
                    self.log_test("POST /api/admin/login (valid token → 200)", False, 
                                f"Expected ok:true, got: {data}")
                    return False
            else:
                self.log_test("POST /api/admin/login (valid token → 200)", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST /api/admin/login (valid token → 200)", False, f"Exception: {str(e)}")
            return False

    def test_admin_login_wrong_token(self):
        """Test POST /api/admin/login with wrong token returns 401"""
        print("\n🔍 Testing POST /api/admin/login (wrong token)...")
        try:
            response = requests.post(
                f"{self.api_url}/admin/login",
                headers={"X-Admin-Token": "wrong-token"},
                timeout=10
            )
            if response.status_code == 401:
                self.log_test("POST /api/admin/login (wrong token → 401)", True, 
                            f"Correctly rejected with 401")
                return True
            else:
                self.log_test("POST /api/admin/login (wrong token → 401)", False, 
                            f"Expected 401, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("POST /api/admin/login (wrong token → 401)", False, f"Exception: {str(e)}")
            return False

    def test_admin_login_no_token(self):
        """Test POST /api/admin/login without token returns 401"""
        print("\n🔍 Testing POST /api/admin/login (no token)...")
        try:
            response = requests.post(f"{self.api_url}/admin/login", timeout=10)
            if response.status_code == 401:
                self.log_test("POST /api/admin/login (no token → 401)", True, 
                            f"Correctly rejected with 401")
                return True
            else:
                self.log_test("POST /api/admin/login (no token → 401)", False, 
                            f"Expected 401, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("POST /api/admin/login (no token → 401)", False, f"Exception: {str(e)}")
            return False

    def test_get_contacts_with_token(self):
        """Test GET /api/contact with valid token returns list"""
        print("\n🔍 Testing GET /api/contact (with valid token)...")
        try:
            response = requests.get(
                f"{self.api_url}/contact",
                headers={"X-Admin-Token": "gsf-admin-2026"},
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/contact (with token → 200)", True, 
                                f"Retrieved {len(data)} contact(s)")
                    # Check if most recent first (if we have multiple)
                    if len(data) >= 2:
                        first_date = data[0].get("createdAt", "")
                        second_date = data[1].get("createdAt", "")
                        if first_date >= second_date:
                            print(f"   ✓ Contacts sorted correctly (most recent first)")
                        else:
                            print(f"   ⚠ Warning: Contacts may not be sorted correctly")
                    return True
                else:
                    self.log_test("GET /api/contact (with token → 200)", False, 
                                f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("GET /api/contact (with token → 200)", False, 
                            f"Status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("GET /api/contact (with token → 200)", False, f"Exception: {str(e)}")
            return False

    def test_get_contacts_wrong_token(self):
        """Test GET /api/contact with wrong token returns 401"""
        print("\n🔍 Testing GET /api/contact (wrong token)...")
        try:
            response = requests.get(
                f"{self.api_url}/contact",
                headers={"X-Admin-Token": "wrong-token"},
                timeout=10
            )
            if response.status_code == 401:
                self.log_test("GET /api/contact (wrong token → 401)", True, 
                            f"Correctly rejected with 401")
                return True
            else:
                self.log_test("GET /api/contact (wrong token → 401)", False, 
                            f"Expected 401, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("GET /api/contact (wrong token → 401)", False, f"Exception: {str(e)}")
            return False

    def test_get_contacts_no_token(self):
        """Test GET /api/contact without token returns 401"""
        print("\n🔍 Testing GET /api/contact (no token)...")
        try:
            response = requests.get(f"{self.api_url}/contact", timeout=10)
            if response.status_code == 401:
                self.log_test("GET /api/contact (no token → 401)", True, 
                            f"Correctly rejected with 401")
                return True
            else:
                self.log_test("GET /api/contact (no token → 401)", False, 
                            f"Expected 401, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("GET /api/contact (no token → 401)", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 70)
        print("GSF BACKEND API TESTS (Iteration 2 - New Admin Features)")
        print(f"Testing: {self.base_url}")
        print("=" * 70)

        # Test health check
        self.test_health_check()

        # NEW: Test admin login endpoint
        print("\n--- NEW FEATURE: Admin Login ---")
        self.test_admin_login_valid()
        self.test_admin_login_wrong_token()
        self.test_admin_login_no_token()

        # NEW: Test protected admin contact listing
        print("\n--- NEW FEATURE: Protected Admin Contact Listing ---")
        self.test_get_contacts_with_token()
        self.test_get_contacts_wrong_token()
        self.test_get_contacts_no_token()

        # REGRESSION: Test contact creation
        print("\n--- REGRESSION: Contact Creation ---")
        contact_id = self.test_contact_valid()

        # REGRESSION: Test validation errors (422)
        print("\n--- REGRESSION: Contact Validation ---")
        self.test_contact_missing_name()
        self.test_contact_missing_company()
        self.test_contact_missing_message()
        self.test_contact_invalid_email()

        # Summary
        print("\n" + "=" * 70)
        print(f"📊 TEST SUMMARY: {self.tests_passed}/{self.tests_run} tests passed")
        print("=" * 70)

        if self.tests_passed == self.tests_run:
            print("✅ All backend tests passed!")
            return 0
        else:
            print(f"❌ {self.tests_run - self.tests_passed} test(s) failed")
            return 1

def main():
    tester = GSFBackendTester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
