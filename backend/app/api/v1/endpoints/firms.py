from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models.user import User
from app.schemas.firm import FirmCreate, FirmResponse
from app.services.firm_service import FirmService

router = APIRouter()


@router.post(
    "",
    response_model=FirmResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_firm(
    request: FirmCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = FirmService(db)
    return service.create_firm(request, current_user)


@router.get(
    "",
    response_model=list[FirmResponse],
)
def list_firms(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = FirmService(db)
    return service.list_firms(current_user)
