import uuid
from datetime import date
from decimal import Decimal
from enum import Enum as PyEnum

from sqlalchemy import Date, Enum, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel


class InvoiceStatus(str, PyEnum):
    UPLOADED = "UPLOADED"
    AI_PROCESSING = "AI_PROCESSING"
    AI_COMPLETED = "AI_COMPLETED"
    REVIEWED = "REVIEWED"
    EXPORTED = "EXPORTED"


class Invoice(BaseModel):
    __tablename__ = "invoices"

    firm_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("firms.id"),
        nullable=False,
    )

    uploaded_by: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    original_filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    stored_filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    image_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    invoice_number: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    vendor_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    gst_number: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    invoice_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    total_amount: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    ai_response: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    status: Mapped[InvoiceStatus] = mapped_column(
        Enum(InvoiceStatus),
        default=InvoiceStatus.UPLOADED,
        nullable=False,
    )

    gst_match: Mapped[bool | None] = mapped_column(
        nullable=True,
    )

    verification_message: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    firm = relationship("Firm")

    user = relationship("User")
