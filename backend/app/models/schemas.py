"""
Schemas for request and response models.
"""

from pydantic import BaseModel


class ChatRequest(BaseModel):
    """Schema for chat request containing the user's message."""

    message: str


class ChatResponse(BaseModel):
    """Schema for chat response containing the assistant's reply."""

    response: str
