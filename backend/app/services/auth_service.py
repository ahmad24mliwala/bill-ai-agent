from uuid import UUID

from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
)
from app.schemas.profile import (
    ChangePasswordRequest,
)


class AuthService:

    def __init__(
        self,
        db: Session,
    ):
        self.user_repository = UserRepository(db)

    # ==========================================
    # Register
    # ==========================================

    def register(
        self,
        request: RegisterRequest,
    ) -> User:

        existing_user = (
            self.user_repository.get_by_email(
                request.email
            )
        )

        if existing_user:

            raise ValueError(
                "Email already registered."
            )

        user = User(
            full_name=request.full_name,
            email=request.email,
            phone=request.phone,
            password_hash=hash_password(
                request.password
            ),
        )

        return self.user_repository.create(user)

    # ==========================================
    # Login
    # ==========================================

    def login(
        self,
        request: LoginRequest,
    ) -> str:

        user = (
            self.user_repository.get_by_email(
                request.email
            )
        )

        if not user:

            raise ValueError(
                "Invalid email or password."
            )

        if not verify_password(
            request.password,
            user.password_hash,
        ):

            raise ValueError(
                "Invalid email or password."
            )

        access_token = create_access_token(
            {
                "sub": str(user.id),
            }
        )

        return access_token

    # ==========================================
    # Get Profile
    # ==========================================

    def get_profile(
        self,
        user_id: UUID,
    ) -> User:

        user = self.user_repository.get_by_id(
            user_id
        )

        if user is None:

            raise ValueError(
                "User not found."
            )

        return user

    # ==========================================
    # Change Password
    # ==========================================

    def change_password(
        self,
        user_id: UUID,
        request: ChangePasswordRequest,
    ) -> None:

        user = self.user_repository.get_by_id(
            user_id
        )

        if user is None:

            raise ValueError(
                "User not found."
            )

        if not verify_password(
            request.current_password,
            user.password_hash,
        ):

            raise ValueError(
                "Current password is incorrect."
            )

        if (
            request.current_password
            == request.new_password
        ):

            raise ValueError(
                "New password must be different from the current password."
            )

        user.password_hash = hash_password(
            request.new_password
        )

        self.user_repository.update(user)
