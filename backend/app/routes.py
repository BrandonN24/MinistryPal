from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.models.schemas import ChatRequest, ChatResponse
from app.chains.chat_chain import run_chat

from app.chains.stream_chain import generate_stream

router = APIRouter()

@router.post("/chat/stream")
async def stream_chat(payload: dict):

    message = payload["message"]

    async def token_generator():
        async for token in generate_stream(message):
            yield token
    
    return StreamingResponse(
        token_generator(),
        media_type="text/plain"
    )

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    output = run_chat(req.message)
    return ChatResponse(response=output)