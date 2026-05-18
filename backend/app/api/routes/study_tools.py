from fastapi import APIRouter
from pydantic import BaseModel

from app.services.retrieval_service import search_chunks
from app.services.gemma_service import generate_response

router = APIRouter()


class SummaryRequest(BaseModel):
    topic: str


@router.post("/summarize")
def summarize(request: SummaryRequest):

    results = search_chunks(
        request.topic,
        top_k=5
    )

    context = "\n\n".join([
        item["text"]
        for item in results
    ])

    prompt = f"""
You are an AI study assistant.

Using the provided context, generate a concise educational summary.

Requirements:
- Clear and beginner-friendly
- Educational tone
- 2-4 paragraphs
- Focus on key ideas
- Do not invent information outside the context

Context:
{context}

Topic:
{request.topic}

Summary:
"""

    summary = generate_response(prompt)

    return {
        "topic": request.topic,
        "summary": summary,
        "sources": results
    }