from app.services.vector_db_service import collection
from app.services.embedding_service import model

def search_chunks(query, top_k=3):

    query_embedding = model.encode([query])[0]

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k
    )

    return results