from datetime import date
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel


class InvoiceUploadResponse(BaseModel):
    invoice_id: UUID
    status: str
    message: str


class InvoiceResponse(BaseModel):
    id: UUID
    invoice_number: str | None
    vendor_name: str | None
    gst_number: str | None
    invoice_date: date | None
    total_amount: Decimal | None
    gst_match: bool | None
    verification_message: str | None

    class Config:
        from_attributes = True


class InvoiceDetailResponse(InvoiceResponse):
    original_filename: str
    stored_filename: str
    image_path: str
    ai_response: dict[str, Any] | None

    class Config:
        from_attributes = True
