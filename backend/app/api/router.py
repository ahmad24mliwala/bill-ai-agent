from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    dashboard,
    firms,
    health,
    invoices,
)

api_router = APIRouter()

api_router.include_router(
    health.router,
    tags=["Health"],
)

api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"],
)

api_router.include_router(
    firms.router,
    prefix="/firms",
    tags=["Firms"],
)

api_router.include_router(
    invoices.router,
    prefix="/invoices",
    tags=["Invoices"],
)

api_router.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"],
)
