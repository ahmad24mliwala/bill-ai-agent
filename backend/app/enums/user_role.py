from enum import Enum


class UserRole(str, Enum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    ACCOUNTANT = "ACCOUNTANT"
    EMPLOYEE = "EMPLOYEE"
