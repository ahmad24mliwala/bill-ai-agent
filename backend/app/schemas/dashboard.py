from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class DashboardSummary(BaseModel):
    total_invoices: int
    gst_verified: int
    gst_mismatched: int
    total_amount: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )


class MonthlyTrend(BaseModel):
    month: str
    amount: float

    model_config = ConfigDict(
        from_attributes=True
    )


class GSTDistribution(BaseModel):
    verified: int
    mismatched: int

    model_config = ConfigDict(
        from_attributes=True
    )


class TopVendor(BaseModel):
    vendor: str | None
    amount: float

    model_config = ConfigDict(
        from_attributes=True
    )


class RecentInvoice(BaseModel):
    id: str
    invoice_number: str | None
    vendor_name: str | None
    total_amount: float
    gst_match: bool | None

    model_config = ConfigDict(
        from_attributes=True
    )


class DashboardResponse(BaseModel):

    summary: DashboardSummary

    monthly_trend: list[MonthlyTrend]

    gst_distribution: GSTDistribution

    top_vendors: list[TopVendor]

    recent_invoices: list[RecentInvoice]

    model_config = ConfigDict(
        from_attributes=True
    )
