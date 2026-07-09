import json
from pathlib import Path

from google import genai

from app.core.config import settings


class GeminiService:
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY,
        )

    def extract_invoice(
        self,
        file_path: str,
    ) -> dict:

        prompt = """
You are an expert invoice parser.

Read the invoice carefully.

Extract ONLY the following JSON.

{
  "invoice_number": "",
  "vendor_name": "",
  "vendor_gstin": "",
  "invoice_date": "",
  "total_amount": 0
}

Return ONLY valid JSON.
"""

        uploaded_file = self.client.files.upload(
            file=Path(file_path)
        )

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                uploaded_file,
                prompt,
            ],
        )

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "", 1)

        if text.endswith("```"):
            text = text[:-3]

        text = text.strip()

        return json.loads(text)
