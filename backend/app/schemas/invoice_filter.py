from datetime import date

from pydantic import BaseModel


class InvoiceFilter(BaseModel):
    vendor: str | None = None
    invoice_number: str | None = None
    gst_match: bool | None = None
    date_from: date | None = None
    date_to: date | None = None
