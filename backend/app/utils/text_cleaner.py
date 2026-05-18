import re

def clean_text(text: str) -> str:
    
    text = re.sub(r'\s+', ' ', text)  # Replace multiple whitespace with a single space

    text = text.strip()  # Remove leading and trailing whitespace

    return text