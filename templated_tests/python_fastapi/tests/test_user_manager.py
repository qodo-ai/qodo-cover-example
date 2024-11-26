import pytest
from datetime import datetime
from pydantic import EmailStr
from myapp.user_manager import UserManager, User

@pytest.fixture
def user_manager():
    return UserManager()

@pytest.fixture
def valid_user_data():
    return {
        "username": "testuser",
        "email": "test@example.com",
        "full_name": "Test User"
    }

class TestUserManager:
    def test_create_valid_user(self, user_manager, valid_user_data):
        user = user_manager.create_user(**valid_user_data)
        assert user.username == valid_user_data["username"]
        assert user.email == valid_user_data["email"]
        assert user.full_name == valid_user_data["full_name"]
        assert user.active == True
        assert isinstance(user.created_at, datetime)