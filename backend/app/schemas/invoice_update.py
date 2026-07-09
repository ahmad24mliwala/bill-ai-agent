from datetime import date
from decimal import Decimal

from pydantic import BaseModel


class InvoiceUpdate(BaseModel):
    vendor_name: str
    gst_number: str
    invoice_number: str
    invoice_date: date
    total_amount: Decimal
