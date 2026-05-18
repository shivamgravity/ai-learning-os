const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

export async function askQuestion(query) {

  const response = await fetch(
    `http://127.0.0.1:8000/api/chat?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  return response.json();
}