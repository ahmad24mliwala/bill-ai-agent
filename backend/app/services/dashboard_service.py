from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.invoice_repository import InvoiceRepository


class DashboardService:

    def __init__(self, db: Session):
        self.repository = InvoiceRepository(db)

    def get_dashboard(
        self,
        user_id: UUID,
    ) -> dict:

        return self.repository.get_dashboard_stats(user_id)
