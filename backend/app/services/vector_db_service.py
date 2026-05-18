import chromadb

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="study_materials"
)

def store_chunks(chunks, embeddings, filename):

    ids = []

    metadatas = []

    for i, chunk in enumerate(chunks):

        ids.append(f"{filename}_{i}")

        metadatas.append({
            "source": filename,
            "chunk_index": i
        })

    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        metadatas=metadatas,
        ids=ids
    )