from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    role: str = "CITIZEN" # CITIZEN, OFFICIAL, CM_ADMIN
    department: Optional[str] = None
    jurisdiction_region: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    role: str
    department: Optional[str] = None
    jurisdiction_region: Optional[str] = None
    is_verified: bool
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
