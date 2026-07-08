from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import RegisterRequest


class AuthService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def register(
        self,
        request: RegisterRequest,
    ) -> User:

        existing_user = self.user_repository.get_by_email(
            request.email
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
