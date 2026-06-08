"""
Chat chain for handling user messages and generating responses.
"""

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant that provides information about the Bible.",
        ),
        ("human", "{input}"),
    ]
)

chain = prompt | llm


def run_chat(message: str) -> str:
    """Function to run the chat chain with a given user message."""
    result = chain.invoke({"input": message})
    return result.content
