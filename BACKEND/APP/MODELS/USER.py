from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from APP.CORE.DATABASE import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    
    # Credentials
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    phone_number = Column(String(20), unique=True, index=True, nullable=True)
    
    # Role Management: 'CITIZEN', 'OFFICIAL', 'CM_ADMIN'
    role = Column(String(50), default="CITIZEN", nullable=False)
    
    # Role specific data
    department = Column(String(120), nullable=True) # e.g. 'WATER_SUPPLY', 'BSES' for OFFICIAL
    jurisdiction_region = Column(String(120), nullable=True) # e.g. 'SOUTH_DELHI'
    
    # Anti-Corruption Tracking
    is_verified = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
