from app.services.vector_db_service import collection
from app.services.embedding_service import model

def search_chunks(query, top_k=3):

    query_embedding = model.encode([query])[0]

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k
    )

    formatted_results = []

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    for doc, metadata, distance in zip(
        documents,
        metadatas,
        distances
    ):

        formatted_results.append({
            "text": doc,
            "source": metadata["source"],
            "chunk_index": metadata["chunk_index"],
            "distance": round(distance, 4)
        })

    return formatted_results