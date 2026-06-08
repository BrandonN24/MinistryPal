"""This module defines a stream chain that generates
responses from a language model in a streaming fashion."""

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-4o-mini", streaming=True, temperature=0.7)

""" Generates a response from the language model by 
    yielding each chunk of content as it is received. """


async def generate_stream(message: str):
    """Asynchronously generates a response from the language model by
    yielding each chunk of content as it is received."""
    async for chunk in llm.astream([HumanMessage(content=message)]):
        if chunk.content:
            yield chunk.content
