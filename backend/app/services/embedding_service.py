from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    device="cpu"
)

def generate_embeddings(chunks):

    embeddings = model.encode(chunks)

    return embeddings