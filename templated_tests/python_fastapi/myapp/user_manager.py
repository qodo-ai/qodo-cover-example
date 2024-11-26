from pydantic import BaseModel, EmailStr
from typing import Dict, Optional, List
import re
from datetime import datetime

class User(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    created_at: datetime = datetime.now()
    active: bool = True

class UserManager:
    def __init__(self):
        self.users: Dict[str, User] = {}
    
    def create_user(self, username: str, email: str, full_name: str) -> User:
        """Create a new user if username doesn't exist and email is valid."""
        if username in self.users:
            raise ValueError("Username already exists")
        
        if not self._is_valid_username(username):
            raise ValueError("Invalid username format")

        user = User(
            username=username,
            email=email,
            full_name=full_name
        )
        self.users[username] = user
        return user
    
    def get_user(self, username: str) -> Optional[User]:
        """Retrieve a user by username."""
        return self.users.get(username)
    
    def update_user(self, username: str, **kwargs) -> Optional[User]:
        """Update user fields if user exists."""
        if username not in self.users:
            return None
        
        user_data = self.users[username].dict()
        user_data.update(**kwargs)
        self.users[username] = User(**user_data)
        return self.users[username]
    
    def deactivate_user(self, username: str) -> bool:
        """Deactivate a user account."""
        if username not in self.users:
            return False
        self.users[username].active = False
        return True
    
    def search_users(self, query: str) -> List[User]:
        """Search users by username or full name."""
        query = query.lower()
        return [
            user for user in self.users.values()
            if query in user.username.lower() or query in user.full_name.lower()
        ]
    
    @staticmethod
    def _is_valid_username(username: str) -> bool:
        """Check if username meets required format."""
        pattern = r'^[a-zA-Z0-9_]{3,20}$'
        return bool(re.match(pattern, username))