from uuid import UUID

from pydantic import BaseModel, EmailStr

from app.enums.user_role import UserRole


class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    phone: str | None
    role: UserRole
    is_active: bool

    model_config = {
        "from_attributes": True
    }
