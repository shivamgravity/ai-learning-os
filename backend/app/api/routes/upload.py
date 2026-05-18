from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_service import extract_text_from_pdf

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = extract_text_from_pdf(file_path)

    preview = extracted_text[:1000] if extracted_text.strip() else "None"

    return {
        "filename": file.filename,
        "message": "File uploaded successfully",
        "preview": preview,
        "has_text": bool(extracted_text.strip())
    }