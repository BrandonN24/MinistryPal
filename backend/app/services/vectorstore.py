"""Service for creating and managing vector stores."""

from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings


def create_vectorstore(docs):
    """Function to create a vector store from a list of documents."""
    embeddings = OpenAIEmbeddings()
    return FAISS.from_texts(docs, embeddings)
