"""
DATABASE CONFIGURATION

This module creates the database connection for CivicLens AI.
It includes a robust auto-fallback system: if the cloud PostgreSQL
fails to connect (e.g., Render IPv6 issues), it automatically 
falls back to a local SQLite database so the app never crashes.
"""

import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from APP.CORE.CONFIG import settings

logger = logging.getLogger(__name__)

DATABASE_URL = settings.DATABASE_URL

def create_db_engine(db_url):
    return create_engine(
        db_url,
        connect_args={"check_same_thread": False} if db_url.startswith("sqlite") else {}
    )

engine = create_db_engine(DATABASE_URL)

# --- AUTO-FALLBACK MECHANISM ---
try:
    # Test connection to ensure DB is reachable (fixes Render IPv6 crash)
    with engine.connect() as conn:
        logger.info("Successfully connected to primary database.")
except Exception as e:
    logger.error(f"Primary DB connection failed (Likely Supabase IPv6 issue): {e}")
    logger.warning("AUTO-FALLBACK TRIGGERED: Switching to local SQLite database.")
    DATABASE_URL = "sqlite:///./civiclens_fallback.db"
    engine = create_db_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    """
    Dependency used in FastAPI routes.
    Provides a database session and closes it automatically.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()