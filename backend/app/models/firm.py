import uuid

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel


class Firm(BaseModel):
    __tablename__ = "firms"

    owner_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    gst_number: Mapped[str | None] = mapped_column(
        String(20),
        unique=True,
        nullable=True,
    )

    phone: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    address: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    owner = relationship(
        "User",
        back_populates="firms",
    )
