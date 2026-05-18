import ollama

MODEL_NAME = "gemma3:1b"

def generate_response(prompt: str):

    response = ollama.chat(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]