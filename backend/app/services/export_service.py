from pathlib import Path
from uuid import UUID

from openpyxl import Workbook
from openpyxl.styles import Font

from app.repositories.invoice_repository import InvoiceRepository


class ExportService:

    def __init__(self, db):
        self.repository = InvoiceRepository(db)

    def export_excel(
        self,
        user_id: UUID,
    ) -> str:
        """
        Export all invoices of the logged-in user to Excel.
        Returns the generated file path.
        """

        invoices = self.repository.list_by_user(user_id)

        workbook = Workbook()
        worksheet = workbook.active
        worksheet.title = "Invoices"

        headers = [
            "Invoice Number",
            "Vendor Name",
            "GST Number",
            "Invoice Date",
            "Total Amount",
            "GST Verified",
            "Verification Message",
        ]

        # Header row
        for column, header in enumerate(headers, start=1):
            cell = worksheet.cell(row=1, column=column)
            cell.value = header
            cell.font = Font(bold=True)

        # Data rows
        row = 2

        for invoice in invoices:
            worksheet.cell(row=row, column=1).value = invoice.invoice_number
            worksheet.cell(row=row, column=2).value = invoice.vendor_name
            worksheet.cell(row=row, column=3).value = invoice.gst_number

            worksheet.cell(row=row, column=4).value = (
                invoice.invoice_date.isoformat()
                if invoice.invoice_date
                else ""
            )

            worksheet.cell(row=row, column=5).value = (
                float(invoice.total_amount)
                if invoice.total_amount
                else 0
            )

            worksheet.cell(row=row, column=6).value = (
                "Verified"
                if invoice.gst_match
                else "Mismatch"
            )

            worksheet.cell(row=row, column=7).value = (
                invoice.verification_message
            )

            row += 1

        export_dir = Path("exports")
        export_dir.mkdir(exist_ok=True)

        file_path = export_dir / f"invoices_{user_id}.xlsx"

        workbook.save(file_path)

        return str(file_path)
