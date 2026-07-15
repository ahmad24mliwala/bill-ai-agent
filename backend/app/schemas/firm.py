from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class FirmBase(BaseModel):
    name: str
    gst_number: str | None = None
    phone: str | None = None
    email: EmailStr | None = None
    address: str | None = None
    is_active: bool = True


class FirmCreate(FirmBase):
    pass


class FirmUpdate(BaseModel):
    name: str
    gst_number: str | None = None
    phone: str | None = None
    email: EmailStr | None = None
    address: str | None = None
    is_active: bool = True


class FirmResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: UUID

    name: str

    gst_number: str | None

    phone: str | None

    email: str | None

    address: str | None

    is_active: bool
