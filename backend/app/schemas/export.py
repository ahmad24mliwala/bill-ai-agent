from datetime import date
from uuid import UUID

from fastapi import Query


class ExportFilter:

    def __init__(
        self,
        firm_id: UUID | None = Query(None),
        gst_match: bool | None = Query(None),
        date_from: date | None = Query(None),
        date_to: date | None = Query(None),
        vendor: str | None = Query(None),
        invoice_number: str | None = Query(None),
    ):
        self.firm_id = firm_id
        self.gst_match = gst_match
        self.date_from = date_from
        self.date_to = date_to
        self.vendor = vendor
        self.invoice_number = invoice_number
