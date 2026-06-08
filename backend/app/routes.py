"""Routes for the MinistryPal API, including the chat endpoint."""

from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.chains.chat_chain import run_chat

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    """Endpoint for handling chat requests."""
    output = run_chat(req.message)
    return ChatResponse(response=output)
