import re

def clean_text(text: str) -> str:

    # Fix hyphenated line breaks
    text = re.sub(r'-\s+', '', text)

    # Fix excessive whitespace
    text = re.sub(r'\s+', ' ', text)

    # Remove weird unicode spacing
    text = text.replace('\u00ad', '')

    text = text.strip()

    return text