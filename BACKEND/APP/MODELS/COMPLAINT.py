from __future__ import annotations

from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text, Boolean, JSON
from sqlalchemy.orm import relationship

from APP.CORE.DATABASE import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)

    location = Column(String(255), nullable=True)
    formatted_address = Column(String(255), nullable=True)
    normalized_location = Column(String(255), nullable=True)
    locality = Column(String(255), nullable=True)
    sub_locality = Column(String(255), nullable=True)
    district = Column(String(255), nullable=True)
    region = Column(String(255), nullable=True)
    ward = Column(String(255), nullable=True)
    zone = Column(String(255), nullable=True)

    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)

    submitted_by = Column(String(120), nullable=True, index=True)
    contact = Column(String(255), nullable=True)

    category = Column(String(120), nullable=True)
    urgency = Column(String(50), nullable=True)
    priority_score = Column(Float, nullable=True)
    department = Column(String(120), nullable=True)
    ai_summary = Column(Text, nullable=True)
    model_confidence = Column(Float, nullable=True)

    duplicate_of = Column(Integer, ForeignKey("complaints.id"), nullable=True)
    duplicate_cluster_id = Column(String(120), nullable=True)
    similarity_score = Column(Float, nullable=True)
    
    # Advanced AI Embeddings & Media
    photo_url = Column(String(500), nullable=True)
    vector_embedding = Column(JSON, nullable=True) # Placeholder for pgvector until Postgres migration

    # Anti-Corruption Features
    status = Column(String(50), nullable=False, default="NEW")
    otp_verified_closure = Column(Boolean, default=False)
    contested_closure = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )
    resolved_at = Column(DateTime, nullable=True)

    duplicate_parent = relationship("Complaint", remote_side=[id], uselist=False)