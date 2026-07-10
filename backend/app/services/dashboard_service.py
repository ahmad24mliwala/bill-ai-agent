from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.analytics_repository import AnalyticsRepository


class DashboardService:

    def __init__(
        self,
        db: Session,
    ):
        self.repository = AnalyticsRepository(db)

    def get_dashboard(
        self,
        user_id: UUID,
    ):

        return {
            "summary":
                self.repository.get_summary(
                    user_id
                ),

            "monthly_trend":
                self.repository.get_monthly_trend(
                    user_id
                ),

            "gst_distribution":
                self.repository.get_gst_distribution(
                    user_id
                ),

            "top_vendors":
                self.repository.get_top_vendors(
                    user_id
                ),

            "recent_invoices":
                self.repository.get_recent_invoices(
                    user_id
                ),
        }
