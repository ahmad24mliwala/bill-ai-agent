from app.core.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)

password = "Ahmad@123"

hashed = hash_password(password)

print("=" * 50)
print("HASHED PASSWORD")
print("=" * 50)
print(hashed)

print()

print("=" * 50)
print("VERIFY PASSWORD")
print("=" * 50)
print(
    verify_password(
        password,
        hashed,
    )
)

print()

token = create_access_token(
    {
        "sub": "ahmad@example.com",
    }
)

print("=" * 50)
print("JWT")
print("=" * 50)
print(token)

print()

print("=" * 50)
print("DECODED JWT")
print("=" * 50)
print(
    decode_access_token(token)
)
