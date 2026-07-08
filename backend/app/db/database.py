from sqlalchemy import create_engine

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,          # Shows SQL queries in development
    future=True
)
