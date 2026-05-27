from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(
    model="gpt-4o-mini",
    streaming=True,
    temperature=0.7
)

async def generate_stream(message: str):

    async for chunk in llm.astream([
        HumanMessage(content=message)
    ]):

        if chunk.content:
            yield chunk.content