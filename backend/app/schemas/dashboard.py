from decimal import Decimal

from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_invoices: int
    gst_verified: int
    gst_mismatched: int
    total_amount: Decimal
