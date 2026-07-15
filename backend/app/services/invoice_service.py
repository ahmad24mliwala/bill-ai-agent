import json
from datetime import datetime
from uuid import UUID

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.ai.gemini_service import GeminiService
from app.models.invoice import Invoice, InvoiceStatus
from app.repositories.firm_repository import FirmRepository
from app.repositories.invoice_repository import InvoiceRepository
from app.schemas.invoice_filter import InvoiceFilter
from app.schemas.invoice_update import InvoiceUpdate
from app.storage.local_storage import LocalStorage


class InvoiceService:

    def __init__(self, db: Session):
        self.repository = InvoiceRepository(db)
        self.firm_repository = FirmRepository(db)
        self.storage = LocalStorage()
        self.gemini = GeminiService()

    def upload_invoice(
        self,
        file: UploadFile,
        firm_id: UUID,
        user_id: UUID,
    ) -> Invoice:

        # Save uploaded file
        stored_filename, image_path = self.storage.save(file)

        # Extract invoice data using Gemini
        ai_data = self.gemini.extract_invoice(image_path)

        # Get firm details
        firm = self.firm_repository.get_by_id(firm_id)

        # Extract GST from AI response
        invoice_gst = ai_data.get("vendor_gstin")

        # Compare GST numbers
        gst_match = False
        verification_message = "GST mismatch."

        if (
            firm
            and firm.gst_number
            and invoice_gst
        ):
            gst_match = (
                firm.gst_number.strip().upper()
                == invoice_gst.strip().upper()
            )

            if gst_match:
                verification_message = (
                    "GST verified successfully."
                )
        else:
            verification_message = (
                "GST could not be verified."
            )

        # Convert invoice date
        invoice_date = None

        if ai_data.get("invoice_date"):
            try:
                invoice_date = datetime.strptime(
                    ai_data["invoice_date"],
                    "%d/%m/%Y",
                ).date()
            except ValueError:
                invoice_date = None

        # Create invoice record
        invoice = Invoice(
            firm_id=firm_id,
            uploaded_by=user_id,
            original_filename=file.filename or stored_filename,
            stored_filename=stored_filename,
            image_path=image_path,
            invoice_number=ai_data.get("invoice_number"),
            vendor_name=ai_data.get("vendor_name"),
            gst_number=invoice_gst,
            invoice_date=invoice_date,
            total_amount=ai_data.get("total_amount"),
            ai_response=json.dumps(ai_data),
            gst_match=gst_match,
            verification_message=verification_message,
        )

        return self.repository.create(invoice)

    def list_invoices(
        self,
        user_id: UUID,
        filters: InvoiceFilter,
    ) -> list[Invoice]:
        """
        Return invoices uploaded by the logged-in user
        after applying optional search filters.
        """
        return self.repository.search(
            user_id=user_id,
            filters=filters,
        )

    def get_invoice(
        self,
        invoice_id: UUID,
    ) -> Invoice | None:
        """
        Return a single invoice by its ID.
        """
        return self.repository.get_by_id(invoice_id)

    def update_invoice(
        self,
        invoice_id: UUID,
        request: InvoiceUpdate,
    ) -> Invoice | None:
        """
        Update an invoice after manual review.
        """

        invoice = self.repository.get_by_id(invoice_id)

        if invoice is None:
            return None

        # Get firm details
        firm = self.firm_repository.get_by_id(
            invoice.firm_id
        )

        # Update invoice fields
        invoice.vendor_name = request.vendor_name
        invoice.gst_number = request.gst_number
        invoice.invoice_number = request.invoice_number
        invoice.invoice_date = request.invoice_date
        invoice.total_amount = request.total_amount

    # ==========================================
    # Delete Invoice
    # ==========================================

    def delete_invoice(
        self,
        invoice_id: UUID,
    ) -> bool:

        invoice = self.repository.get_by_id(
            invoice_id
        )

        if invoice is None:
            return False

        self.repository.delete(invoice)

        return True

    # ==========================================
    # Delete All User Invoices
    # ==========================================

    def delete_all_invoices(
        self,
        user_id: UUID,
    ) -> int:

        return self.repository.delete_all_by_user(
            user_id
        )

        # Recalculate GST verification
        gst_match = False
        verification_message = "GST mismatch."

        if (
            firm
            and firm.gst_number
            and request.gst_number
        ):
            gst_match = (
                firm.gst_number.strip().upper()
                == request.gst_number.strip().upper()
            )

            if gst_match:
                verification_message = (
                    "GST verified successfully."
                )
        else:
            verification_message = (
                "GST could not be verified."
            )

        invoice.gst_match = gst_match
        invoice.verification_message = verification_message

        # Mark invoice as reviewed
        invoice.status = InvoiceStatus.REVIEWED

        return self.repository.update(invoice)
