# import subprocess
import time
from rag_system import populate_knowledge_base
from rag_chat_vector import chat_with_knowledge_base

# def run_migration():
#     """Run database migration."""
#     print("🔨 開始資料庫遷移...")
#     subprocess.run(["python", "migration.py"], check=True)

import subprocess
import os
import sys

def run_migration():
    """Run database migration."""
    print("🔨 開始資料庫遷移...")

    # Get the path to the Python executable in the current virtual environment
    python_executable = os.path.join(os.path.dirname(sys.executable), "python.exe") # For Windows
    # python_executable = sys.executable # For Linux/macOS

    try:
        subprocess.run([python_executable, "migration.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running migration: {e}")
        print(f"Stdout: {e.stdout}")  # Print stdout for debugging
        print(f"Stderr: {e.stderr}")  # Print stderr for debugging
        raise  # Re-raise the exception if you want the program to stop
    except FileNotFoundError:
        print(f"Error: Python executable not found at {python_executable}")
        raise    

def main():
    # 1. Run database migration
    run_migration()

    # 2. Initialize knowledge base (populate from files A.txt and B.md)
    populate_knowledge_base()

    print("📚 知識庫已經建立。現在可以開始提問。")
    while True:
        # 3. Get a question from the user
        question = input("❓ 請輸入問題（輸入 'exit' 來結束）: ")
        if question.lower() == 'exit':
            print("👋 程式結束。")
            break

        # 4. Get an answer using RAG
        answer = chat_with_knowledge_base(question)
        print(f"🤖 回答: {answer}")

if __name__ == "__main__":
    main()
