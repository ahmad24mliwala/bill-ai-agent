from app.ai.gemini_service import GeminiService

service = GeminiService()

result = service.extract_invoice(
    "uploads/2026/07/09/f6b24d9b-554f-4a31-81e4-2a85437e0160.pdf"
)

print(result)
