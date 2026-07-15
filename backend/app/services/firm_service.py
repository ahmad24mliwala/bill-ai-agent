from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.firm import Firm
from app.models.user import User
from app.repositories.firm_repository import FirmRepository
from app.schemas.firm import (
    FirmCreate,
    FirmUpdate,
)


class FirmService:

    def __init__(
        self,
        db: Session,
    ):
        self.repository = FirmRepository(db)

    def create_firm(
        self,
        request: FirmCreate,
        owner: User,
    ) -> Firm:

        firm = Firm(
            owner_id=owner.id,
            name=request.name,
            gst_number=request.gst_number,
            phone=request.phone,
            email=request.email,
            address=request.address,
            is_active=request.is_active,
        )

        return self.repository.create(firm)

    def list_firms(
        self,
        owner: User,
    ) -> list[Firm]:

        return self.repository.get_all_by_owner(
            owner.id
        )

    def get_firm(
        self,
        firm_id: UUID,
        owner: User,
    ) -> Firm:

        firm = self.repository.get_by_id(
            firm_id
        )

        if (
            not firm
            or firm.owner_id != owner.id
        ):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Firm not found.",
            )

        return firm

    def update_firm(
        self,
        firm_id: UUID,
        request: FirmUpdate,
        owner: User,
    ) -> Firm:

        firm = self.get_firm(
            firm_id,
            owner,
        )

        firm.name = request.name
        firm.gst_number = request.gst_number
        firm.phone = request.phone
        firm.email = request.email
        firm.address = request.address
        firm.is_active = request.is_active

        return self.repository.update(
            firm
        )

    def delete_firm(
        self,
        firm_id: UUID,
        owner: User,
    ) -> None:

        firm = self.get_firm(
            firm_id,
            owner,
        )

        self.repository.delete(firm)
