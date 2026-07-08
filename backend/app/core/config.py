from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "AI Bill Processing System"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"

    HOST: str = "127.0.0.1"
    PORT: int = 8000

    DATABASE_URL: str = (
        "postgresql://postgres:password@localhost:5432/bill_ai"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()
