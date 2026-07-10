from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models.user import User
from app.services.export_service import ExportService

router = APIRouter()


@router.get(
    "/excel",
    summary="Export invoices to Excel",
)
def export_excel(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Export all invoices of the logged-in user
    as an Excel (.xlsx) file.
    """

    service = ExportService(db)

    file_path = service.export_excel(current_user.id)

    return FileResponse(
        path=file_path,
        filename="Invoices.xlsx",
        media_type=(
            "application/vnd.openxmlformats-officedocument."
            "spreadsheetml.sheet"
        ),
    )
