from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.schemas.invoice_filter import InvoiceFilter


class InvoiceRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        invoice: Invoice,
    ) -> Invoice:

        self.db.add(invoice)
        self.db.commit()
        self.db.refresh(invoice)

        return invoice

    def update(
        self,
        invoice: Invoice,
    ) -> Invoice:
        """
        Save changes made to an existing invoice.
        """

        self.db.commit()
        self.db.refresh(invoice)

        return invoice

    def list_by_user(
        self,
        user_id: UUID,
    ) -> list[Invoice]:

        statement = (
            select(Invoice)
            .where(Invoice.uploaded_by == user_id)
            .order_by(Invoice.created_at.desc())
        )

        return list(self.db.scalars(statement))

    def get_by_id(
        self,
        invoice_id: UUID,
    ) -> Invoice | None:

        statement = (
            select(Invoice)
            .where(Invoice.id == invoice_id)
        )

        return self.db.scalar(statement)

    def get_dashboard_stats(
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
            .where(Invoice.uploaded_by == user_id)
        ) or 0

        return {
            "total_invoices": total_invoices,
            "gst_verified": gst_verified,
            "gst_mismatched": gst_mismatched,
            "total_amount": total_amount,
        }

    def search(
        self,
        user_id: UUID,
        filters: InvoiceFilter,
    ) -> list[Invoice]:

        statement = (
            select(Invoice)
            .where(Invoice.uploaded_by == user_id)
        )

        if filters.vendor:
            statement = statement.where(
                Invoice.vendor_name.ilike(
                    f"%{filters.vendor}%"
                )
            )

        if filters.invoice_number:
            statement = statement.where(
                Invoice.invoice_number.ilike(
                    f"%{filters.invoice_number}%"
                )
            )

        if filters.gst_match is not None:
            statement = statement.where(
                Invoice.gst_match == filters.gst_match
            )

        if filters.date_from:
            statement = statement.where(
                Invoice.invoice_date >= filters.date_from
            )

        if filters.date_to:
            statement = statement.where(
                Invoice.invoice_date <= filters.date_to
            )

        statement = statement.order_by(
            Invoice.created_at.desc()
        )

        return list(self.db.scalars(statement))
