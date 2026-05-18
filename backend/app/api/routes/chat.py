from fastapi import APIRouter

from app.services.retrieval_service import search_chunks
from app.services.gemma_service import generate_response

router = APIRouter()

@router.get("/chat")
def chat(query: str):

    results = search_chunks(query)

    context = "\n\n".join([
        item["text"]
        for item in results
    ])

    prompt = f"""
You are an AI learning assistant.

Use the provided context to answer the user's question clearly and accurately.

If the context partially contains the answer, use the available information to give the best possible explanation.

Do not invent information outside the context.

Context:
{context}

Question:
{query}

Answer:
"""

    answer = generate_response(prompt)

    return {
        "query": query,
        "answer": answer,
        "sources": results
    }