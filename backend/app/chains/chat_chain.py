from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that provides information about the Bible."),
    ("human", "{input}")
])

chain = prompt | llm

def run_chat(message: str) -> str:
    result = chain.invoke({"input": message})
    return result.content
