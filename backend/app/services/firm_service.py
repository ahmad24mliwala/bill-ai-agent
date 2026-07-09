from sqlalchemy.orm import Session

from app.models.firm import Firm
from app.models.user import User
from app.repositories.firm_repository import FirmRepository
from app.schemas.firm import FirmCreate


class FirmService:
    def __init__(self, db: Session):
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
        )

        return self.repository.create(firm)

    def list_firms(
        self,
        owner: User,
    ) -> list[Firm]:

        return self.repository.get_all_by_owner(owner.id)
