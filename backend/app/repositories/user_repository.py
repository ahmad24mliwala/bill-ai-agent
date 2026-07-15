from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # ===========================
    # Create User
    # ===========================

    def create(
        self,
        user: User,
    ) -> User:

        self.db.add(user)

        self.db.commit()

        self.db.refresh(user)

        return user

    # ===========================
    # Get User By ID
    # ===========================

    def get_by_id(
        self,
        user_id: UUID,
    ) -> User | None:

        statement = (
            select(User)
            .where(User.id == user_id)
        )

        return self.db.scalar(statement)

    # ===========================
    # Get User By Email
    # ===========================

    def get_by_email(
        self,
        email: str,
    ) -> User | None:

        statement = (
            select(User)
            .where(User.email == email)
        )

        return self.db.scalar(statement)

    # ===========================
    # Update User
    # ===========================

    def update(
        self,
        user: User,
    ) -> User:

        self.db.commit()

        self.db.refresh(user)

        return user
