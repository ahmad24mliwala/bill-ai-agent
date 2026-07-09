from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class FirmCreate(BaseModel):
    name: str
    gst_number: str | None = None
    phone: str | None = None
    email: EmailStr | None = None
    address: str | None = None


class FirmResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    gst_number: str | None
    phone: str | None
    email: str | None
    address: str | None
    is_active: bool
