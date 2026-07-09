from datetime import datetime
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.core.config import settings


class LocalStorage:

    def save(self, file: UploadFile) -> tuple[str, str]:
        today = datetime.now()

        folder = (
            Path(settings.UPLOAD_DIR)
            / str(today.year)
            / f"{today.month:02}"
            / f"{today.day:02}"
        )

        folder.mkdir(parents=True, exist_ok=True)

        extension = Path(file.filename or "").suffix.lower()

        allowed_extensions = {
            ".jpg",
            ".jpeg",
            ".png",
            ".pdf",
        }

        if extension not in allowed_extensions:
            raise ValueError("Unsupported file type.")

        filename = f"{uuid4()}{extension}"

        path = folder / filename

        with open(path, "wb") as buffer:
            buffer.write(file.file.read())

        return filename, str(path)
