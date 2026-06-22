from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from APP.CORE.DATABASE import get_db
from APP.MODELS.USER import User
from APP.SCHEMAS.USER_SCHEMA import UserCreate, UserLogin, TokenResponse
import hashlib

from APP.CORE.CONFIG import settings
from APP.SERVICES.EMAIL_SERVICE import (
    is_email_delivery_configured,
    send_verification_otp_email,
)
from APP.SERVICES.OTP_SERVICE import (
    OTPError,
    OTPRateLimitError,
    clear_email_otp,
    create_email_otp,
    normalize_email,
    verify_email_otp,
)

router = APIRouter()


class SendOTPRequest(BaseModel):
    email: str


class VerifyOTPRequest(BaseModel):
    email: str
    otp: str


@router.post("/send-otp")
def send_otp(payload: SendOTPRequest):
    try:
        normalized_email = normalize_email(payload.email)
        otp, expires_in_seconds = create_email_otp(normalized_email)
    except OTPRateLimitError as error:
        raise HTTPException(status_code=429, detail=str(error)) from error
    except OTPError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    if is_email_delivery_configured():
        if send_verification_otp_email(normalized_email, otp):
            message = "OTP sent successfully."
            delivery = "email"
            otp_preview = None
        elif settings.ALLOW_LOCAL_OTP_FALLBACK:
            message = (
                "Email delivery is unavailable in this environment. "
                f"Use OTP {otp} to continue locally."
            )
            delivery = "local"
            otp_preview = otp
        else:
            clear_email_otp(normalized_email)
            raise HTTPException(status_code=502, detail="Failed to send OTP email.")
    elif settings.ALLOW_LOCAL_OTP_FALLBACK:
        message = (
            "Email delivery is not configured in this environment. "
            f"Use OTP {otp} to continue locally."
        )
        delivery = "local"
        otp_preview = otp
    else:
        clear_email_otp(normalized_email)
        raise HTTPException(status_code=503, detail="OTP email delivery is not configured.")

    response = {
        "message": message,
        "expires_in_seconds": expires_in_seconds,
        "cooldown_seconds": settings.OTP_COOLDOWN_SECONDS,
        "delivery": delivery,
    }

    if otp_preview is not None:
        response["otp_preview"] = otp_preview

    return response


@router.post("/verify-otp")
def verify_otp(payload: VerifyOTPRequest):
    try:
        verify_email_otp(payload.email, payload.otp)
    except OTPError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    return {
        "verified": True,
        "message": "Email verified successfully.",
    }

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/register", response_model=TokenResponse)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == payload.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
        
    new_user = User(
        username=payload.username,
        hashed_password=hash_password(payload.password),
        email=payload.email,
        phone_number=payload.phone_number,
        role=payload.role.upper(),
        department=payload.department.upper() if payload.department else None,
        jurisdiction_region=payload.jurisdiction_region.upper() if payload.jurisdiction_region else None,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Mock JWT Token for MVP
    return {
        "access_token": f"mock-jwt-token-{new_user.id}",
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/login", response_model=TokenResponse)
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == payload.username).first()
    if not user or user.hashed_password != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
        
    return {
        "access_token": f"mock-jwt-token-{user.id}",
        "token_type": "bearer",
        "user": user
    }
