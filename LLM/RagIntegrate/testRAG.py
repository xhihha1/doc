import ollama
import faiss
import json
import numpy as np
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer

# **Step 1: 加載語言模型作為文本嵌入模型**
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")  # 生成向量嵌入

# **Step 2: 加載文件並切割成小段**
documents = [
    "天空是蓝色的，因为阳光通过大气层时，短波长的蓝光被散射得更明显。",
    "空气中的分子和粒子会散射阳光，这个过程被称为瑞利散射。",
    "光是一種粒子",
    "光是一種波動",
    "光是撐到下班就不容易了",
]
text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=10)
chunks = text_splitter.split_text("\n".join(documents))

# **Step 3: 創建 FAISS 向量資料庫**
# 1. 生成文本嵌入
embeddings = np.array([embedding_model.encode(chunk) for chunk in chunks], dtype="float32")

# 2. 建立 FAISS 索引
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# **Step 4: RAG 检索**
def retrieve_relevant_docs(query, top_k=2):
    query_vector = embedding_model.encode(query).astype("float32").reshape(1, -1)
    distances, indices = index.search(query_vector, top_k)
    return [chunks[i] for i in indices[0] if i < len(chunks)]

# **Step 5: 使用 Ollama + `gemma:2b` 進行 RAG 問答**
def ask_rag(query):
    # 1. 檢索相關文檔
    context_docs = retrieve_relevant_docs(query)
    context_text = "\n".join(context_docs)

    # 2. 使用 `template` 格式化輸入
    template = f"""
    你是一位專業的生活小助手，請根據以下背景知識來回答問題：
    
    【背景知識】:
    {context_text}

    【問題】:
    {query}

    【回答】:
    """
    
    # 3. 使用 Ollama 進行問答
    response = ollama.chat(model="gemma:2b", messages=[
        {"role": "user", "content": template}
    ])
    
    return response['message']['content']

# **測試 RAG 系統**
question = "光是什麼？"
answer = ask_rag(question)

print("\n=== RAG 問答 ===")
print(f"問題: {question}")
print(f"回答: {answer}")
