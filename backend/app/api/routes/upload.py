from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_service import extract_text_from_pdf
from app.utils.text_cleaner import clean_text
from app.services.chunking_service import chunk_text
from app.services.embedding_service import generate_embeddings
from app.services.vector_db_service import store_chunks

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    raw_text = extract_text_from_pdf(file_path)

    cleaned_text = clean_text(raw_text)

    chunks = chunk_text(cleaned_text)

    embeddings = generate_embeddings(chunks)

    store_chunks(
        chunks=chunks,
        embeddings=embeddings,
        filename=file.filename
    )

    preview = cleaned_text[:1000] if cleaned_text else None

    return {
        "filename": file.filename,
        "message": "File uploaded successfully",
        "preview": preview,
        "has_text": bool(cleaned_text),
        "chunk_count": len(chunks),
        "sample_chunk": chunks[0] if chunks else None
    }