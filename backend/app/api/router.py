from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    dashboard,
    export,
    firms,
    health,
    invoices,
)

api_router = APIRouter()

# Health APIs
api_router.include_router(
    health.router,
    tags=["Health"],
)

# Authentication APIs
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"],
)

# Firm Management APIs
api_router.include_router(
    firms.router,
    prefix="/firms",
    tags=["Firms"],
)

# Invoice APIs
api_router.include_router(
    invoices.router,
    prefix="/invoices",
    tags=["Invoices"],
)

# Export APIs
api_router.include_router(
    export.router,
    prefix="/export",
    tags=["Export"],
)

# Dashboard APIs
api_router.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"],
)
