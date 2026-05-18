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

Answer the user's question ONLY using the provided context.

If the answer is not present in the context, say:
"I could not find the answer in the uploaded material."

Context:
{context}

Question:
{query}
"""

    answer = generate_response(prompt)

    return {
        "query": query,
        "answer": answer,
        "sources": results
    }