import psycopg2
import yaml

# 讀取 config.yml
with open("config.yml", "r") as f:
    config = yaml.safe_load(f)["database"]

# 連接 PostgreSQL
conn = psycopg2.connect(
    host=config["host"],
    port=config["port"],
    user=config["user"],
    password=config["password"],
    dbname=config["dbname"]
)
cur = conn.cursor()

# 啟用 pgvector 擴展（如尚未安裝請先安裝 `CREATE EXTENSION pgvector;`）
cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")

# 建立知識庫表格
cur.execute("""
CREATE TABLE IF NOT EXISTS knowledge_base (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    embedding vector(384) NOT NULL -- 384 維向量
);
""")

conn.commit()
cur.close()
conn.close()
print("✅ 資料表建立完成")
