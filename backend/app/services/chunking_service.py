from typing import List
from nltk.tokenize import sent_tokenize

def chunk_text(
    text: str,
    chunk_size: int = 500,
    overlap_sentences: int = 1
) -> List[str]:

    sentences = sent_tokenize(text)

    chunks = []

    current_chunk = []

    current_length = 0

    for sentence in sentences:

        sentence_length = len(sentence)

        if current_length + sentence_length > chunk_size:

            chunks.append(" ".join(current_chunk))

            overlap = current_chunk[-overlap_sentences:]

            current_chunk = overlap[:]

            current_length = sum(len(s) for s in current_chunk)

        current_chunk.append(sentence)

        current_length += sentence_length

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks