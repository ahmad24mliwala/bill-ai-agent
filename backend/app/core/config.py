from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # -------------------------
    # Application
    # -------------------------
    APP_NAME: str = "AI Bill Processing System"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"

    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # -------------------------
    # Database
    # -------------------------
    DATABASE_URL: str

    # -------------------------
    # JWT Authentication
    # -------------------------
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # -------------------------
    # File Upload
    # -------------------------
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10485760  # 10 MB
    ALLOWED_FILE_TYPES: str = (
        "image/jpeg,image/png,application/pdf"
    )

    # -------------------------
    # Google Gemini AI
    # -------------------------
    GEMINI_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()
