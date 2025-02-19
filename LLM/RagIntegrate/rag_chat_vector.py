import psycopg2
import yaml
import numpy as np
from sentence_transformers import SentenceTransformer
from ollama import chat

# 讀取 config.yml
with open("config.yml", "r") as f:
    config = yaml.safe_load(f)["database"]

# 初始化嵌入模型
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# 連接 PostgreSQL
def get_db_connection():
    return psycopg2.connect(
        host=config["host"],
        port=config["port"],
        user=config["user"],
        password=config["password"],
        dbname=config["dbname"]
    )

def chat_with_knowledge_base(question):
    """Get a response to the user's question using RAG."""
    conn = get_db_connection()
    cur = conn.cursor()

    # 轉換問題為向量
    query_embedding = embedding_model.encode(question).tolist()

    # 確保向量是用於 pgvector 比較的正確格式
    query_embedding_vector = np.array(query_embedding).astype(np.float32).tolist()

    # 在 PostgreSQL 查找最相似的知識
    cur.execute("""
        SELECT text FROM knowledge_base
        ORDER BY embedding <-> %s::vector
        LIMIT 1;
    """, (query_embedding_vector,))

    retrieved_text = cur.fetchone()[0]

    # 交給 Ollama + Gemma 2B 回答
    response = chat(model="gemma:2b", messages=[
        {"role": "system", "content": "請基於以下知識庫回答問題:"},
        {"role": "user", "content": f"問題: {question}\n知識庫: {retrieved_text}"}
    ])

    cur.close()
    conn.close()

    return response.message.content
