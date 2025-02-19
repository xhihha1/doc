import psycopg2
import yaml
from sentence_transformers import SentenceTransformer

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

def populate_knowledge_base():
    """Populate the knowledge base by reading A.txt and B.md."""
    conn = get_db_connection()
    cur = conn.cursor()

    # 讀取已存入的知識數量
    cur.execute("SELECT COUNT(*) FROM knowledge_base;")
    record_count = cur.fetchone()[0]

    if record_count == 0:
        print("📥 讀取 A.txt 和 B.md，並存入 PostgreSQL...")

        # 讀取文件內容
        def read_file(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        
        documents = [
            read_file("A.txt"),
            read_file("B.md")
        ]
        
        # 將文件轉為向量並存入資料庫
        for doc in documents:
            embedding = embedding_model.encode(doc).tolist()
            cur.execute("INSERT INTO knowledge_base (text, embedding) VALUES (%s, %s)", (doc, embedding))

        conn.commit()
        print("✅ 知識庫已存入 PostgreSQL")
    else:
        print("✅ PostgreSQL 已有知識庫，不重複讀取檔案")

    cur.close()
    conn.close()
