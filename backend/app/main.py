from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health, upload, search, chat

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health.router,
    prefix="/api",
    tags=["Health"]
)

app.include_router(
    upload.router,
    prefix="/api",
    tags=["Upload"]
)

app.include_router(
    search.router,
    prefix="/api",
    tags=["Search"]
)

app.include_router(
    chat.router,
    prefix="/api",
    tags=["Chat"]
)

@app.get("/")
def root():
    return {"message": "AI Learning OS Backend Running"}