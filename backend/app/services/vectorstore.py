from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

def create_vectorstore(docs):
    embeddings = OpenAIEmbeddings()
    return FAISS.from_texts(docs, embeddings)