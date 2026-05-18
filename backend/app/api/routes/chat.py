from fastapi import APIRouter
from pydantic import BaseModel

from app.services.retrieval_service import search_chunks
from app.services.gemma_service import generate_response

router = APIRouter()


class ChatRequest(BaseModel):
    query: str
    history: list[str] = []


@router.post("/chat")
def chat(request: ChatRequest):

    history_context = "\n".join(
        request.history[-4:]
    )

    retrieval_query = f"""
Previous conversation:
{history_context}

Current question:
{request.query}
"""

    results = search_chunks(retrieval_query)

    context = "\n\n".join([
        item["text"]
        for item in results
    ])

    prompt = f"""
You are an AI learning assistant.

Use the provided context to answer the user's question clearly and accurately.

If the context partially contains the answer, use the available information to give the best possible explanation.

Do not invent information outside the context.

Conversation history:
{history_context}

Context:
{context}

Question:
{request.query}

Answer:
"""

    answer = generate_response(prompt)

    return {
        "query": request.query,
        "answer": answer,
        "sources": results
    }