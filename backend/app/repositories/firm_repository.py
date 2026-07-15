from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.firm import Firm


class FirmRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        firm: Firm,
    ) -> Firm:

        self.db.add(firm)
        self.db.commit()
        self.db.refresh(firm)

        return firm

    def update(
        self,
        firm: Firm,
    ) -> Firm:

        self.db.commit()
        self.db.refresh(firm)

        return firm

    def delete(
        self,
        firm: Firm,
    ) -> None:

        self.db.delete(firm)
        self.db.commit()

    def get_by_id(
        self,
        firm_id: UUID,
    ) -> Firm | None:

        statement = (
            select(Firm)
            .where(Firm.id == firm_id)
        )

        return self.db.scalar(statement)

    def get_all_by_owner(
        self,
        owner_id: UUID,
    ) -> list[Firm]:

        statement = (
            select(Firm)
            .where(Firm.owner_id == owner_id)
            .order_by(Firm.name.asc())
        )

        return list(
            self.db.scalars(statement)
        )
