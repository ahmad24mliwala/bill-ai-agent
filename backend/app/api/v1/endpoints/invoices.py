import json
from datetime import date
from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.models.user import User
from app.schemas.invoice import (
    InvoiceDetailResponse,
    InvoiceResponse,
    InvoiceUploadResponse,
)
from app.schemas.invoice_filter import InvoiceFilter
from app.schemas.invoice_update import InvoiceUpdate
from app.services.invoice_service import InvoiceService

router = APIRouter()


@router.post(
    "/upload",
    response_model=InvoiceUploadResponse,
    status_code=status.HTTP_201_CREATED,
)
def upload_invoice(
    firm_id: UUID = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = InvoiceService(db)

    try:
        invoice = service.upload_invoice(
            file=file,
            firm_id=firm_id,
            user_id=current_user.id,
        )

        return InvoiceUploadResponse(
            invoice_id=invoice.id,
            status=invoice.status.value,
            message="Invoice uploaded successfully.",
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


@router.get(
    "",
    response_model=list[InvoiceResponse],
)
def list_invoices(
    vendor: str | None = Query(
        default=None,
        description="Search by vendor name",
    ),
    invoice_number: str | None = Query(
        default=None,
        description="Search by invoice number",
    ),
    gst_match: bool | None = Query(
        default=None,
        description="GST verification status",
    ),
    date_from: date | None = Query(
        default=None,
        description="Invoice date from (YYYY-MM-DD)",
    ),
    date_to: date | None = Query(
        default=None,
        description="Invoice date to (YYYY-MM-DD)",
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = InvoiceService(db)

    filters = InvoiceFilter(
        vendor=vendor,
        invoice_number=invoice_number,
        gst_match=gst_match,
        date_from=date_from,
        date_to=date_to,
    )

    return service.list_invoices(
        user_id=current_user.id,
        filters=filters,
    )


@router.get(
    "/{invoice_id}",
    response_model=InvoiceDetailResponse,
)
def get_invoice(
    invoice_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = InvoiceService(db)

    invoice = service.get_invoice(invoice_id)

    if invoice is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found.",
        )

    return InvoiceDetailResponse(
        id=invoice.id,
        invoice_number=invoice.invoice_number,
        vendor_name=invoice.vendor_name,
        gst_number=invoice.gst_number,
        invoice_date=invoice.invoice_date,
        total_amount=invoice.total_amount,
        gst_match=invoice.gst_match,
        verification_message=invoice.verification_message,
        original_filename=invoice.original_filename,
        stored_filename=invoice.stored_filename,
        image_path=invoice.image_path,
        ai_response=(
            None
            if invoice.ai_response is None
            else json.loads(invoice.ai_response)
        ),
    )


@router.patch(
    "/{invoice_id}",
    response_model=InvoiceDetailResponse,
)
def update_invoice(
    invoice_id: UUID,
    request: InvoiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = InvoiceService(db)

    invoice = service.update_invoice(
        invoice_id=invoice_id,
        request=request,
    )

    if invoice is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found.",
        )

    return InvoiceDetailResponse(
        id=invoice.id,
        invoice_number=invoice.invoice_number,
        vendor_name=invoice.vendor_name,
        gst_number=invoice.gst_number,
        invoice_date=invoice.invoice_date,
        total_amount=invoice.total_amount,
        gst_match=invoice.gst_match,
        verification_message=invoice.verification_message,
        original_filename=invoice.original_filename,
        stored_filename=invoice.stored_filename,
        image_path=invoice.image_path,
        ai_response=(
            None
            if invoice.ai_response is None
            else json.loads(invoice.ai_response)
        ),
    )

@router.delete(
    "/{invoice_id}",
    status_code=status.HTTP_200_OK,
)
def delete_invoice(
    invoice_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = InvoiceService(db)

    deleted = service.delete_invoice(
        invoice_id
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found.",
        )

    return {
        "message": "Invoice deleted successfully."
    }


@router.delete(
    "",
    status_code=status.HTTP_200_OK,
)
def delete_all_invoices(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = InvoiceService(db)

    count = service.delete_all_invoices(
        current_user.id
    )

    return {
        "message": f"{count} invoices deleted successfully."
    }
