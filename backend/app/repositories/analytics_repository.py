from uuid import UUID

from sqlalchemy import func, extract, select
from sqlalchemy.orm import Session

from app.models.invoice import Invoice


class AnalyticsRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_summary(
        self,
        user_id: UUID,
    ) -> dict:

        total_invoices = self.db.scalar(
            select(func.count())
            .select_from(Invoice)
            .where(Invoice.uploaded_by == user_id)
        ) or 0

        gst_verified = self.db.scalar(
            select(func.count())
            .select_from(Invoice)
            .where(
                Invoice.uploaded_by == user_id,
                Invoice.gst_match.is_(True),
            )
        ) or 0

        gst_mismatched = self.db.scalar(
            select(func.count())
            .select_from(Invoice)
            .where(
                Invoice.uploaded_by == user_id,
                Invoice.gst_match.is_(False),
            )
        ) or 0

        total_amount = self.db.scalar(
            select(func.sum(Invoice.total_amount))
            .where(
                Invoice.uploaded_by == user_id
            )
        ) or 0

        return {
            "total_invoices": total_invoices,
            "gst_verified": gst_verified,
            "gst_mismatched": gst_mismatched,
            "total_amount": float(total_amount),
        }

    def get_monthly_trend(
        self,
        user_id: UUID,
    ) -> list[dict]:

        statement = (
            select(
                extract(
                    "month",
                    Invoice.invoice_date,
                ).label("month"),
                func.sum(
                    Invoice.total_amount
                ).label("amount"),
            )
            .where(
                Invoice.uploaded_by == user_id,
                Invoice.invoice_date.is_not(None),
            )
            .group_by("month")
            .order_by("month")
        )

        rows = self.db.execute(
            statement
        ).all()

        months = [
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]

        return [
            {
                "month": months[int(row.month)],
                "amount": float(
                    row.amount or 0
                ),
            }
            for row in rows
        ]

    def get_gst_distribution(
        self,
        user_id: UUID,
    ) -> dict:

        verified = self.db.scalar(
            select(func.count())
            .select_from(Invoice)
            .where(
                Invoice.uploaded_by == user_id,
                Invoice.gst_match.is_(True),
            )
        ) or 0

        mismatched = self.db.scalar(
            select(func.count())
            .select_from(Invoice)
            .where(
                Invoice.uploaded_by == user_id,
                Invoice.gst_match.is_(False),
            )
        ) or 0

        return {
            "verified": verified,
            "mismatched": mismatched,
        }

    def get_top_vendors(
        self,
        user_id: UUID,
        limit: int = 5,
    ) -> list[dict]:

        statement = (
            select(
                Invoice.vendor_name,
                func.sum(
                    Invoice.total_amount
                ).label("amount"),
            )
            .where(
                Invoice.uploaded_by == user_id,
                Invoice.vendor_name.is_not(None),
            )
            .group_by(
                Invoice.vendor_name
            )
            .order_by(
                func.sum(
                    Invoice.total_amount
                ).desc()
            )
            .limit(limit)
        )

        rows = self.db.execute(
            statement
        ).all()

        return [
            {
                "vendor": row.vendor_name,
                "amount": float(
                    row.amount or 0
                ),
            }
            for row in rows
        ]

    def get_recent_invoices(
        self,
        user_id: UUID,
        limit: int = 5,
    ) -> list[dict]:

        statement = (
            select(Invoice)
            .where(
                Invoice.uploaded_by == user_id
            )
            .order_by(
                Invoice.created_at.desc()
            )
            .limit(limit)
        )

        invoices = list(
            self.db.scalars(statement)
        )

        return [
            {
                "id": str(invoice.id),
                "invoice_number": invoice.invoice_number,
                "vendor_name": invoice.vendor_name,
                "total_amount": float(
                    invoice.total_amount or 0
                ),
                "gst_match": invoice.gst_match,
            }
            for invoice in invoices
        ]
