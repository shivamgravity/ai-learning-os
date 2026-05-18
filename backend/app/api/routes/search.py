from fastapi import APIRouter

from app.services.retrieval_service import search_chunks

router = APIRouter()

@router.get("/search")
def search(query: str):

    results = search_chunks(query)

    return results