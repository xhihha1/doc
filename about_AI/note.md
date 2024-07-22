
- RAG: Retrieval-Augmented Generation 檢索增強生成  

擷取增強生成 (RAG) 是對大型語言模型輸出最佳化的過程，因此在產生回應之前，它會參考其訓練資料來源以外的權威知識庫。大型語言模型 (LLM) 在大量資料上訓練，並使用數十億個參數來生成原始輸出，用於回答問題、翻譯語言和完成句子等任務。RAG 將原本就很強大的 LLM 功能擴展到特定領域或組織的內部知識庫，而無需重新訓練模型。這是改善 LLM 輸出具成本效益的方法，可讓 LLM 在各種情況下仍然相關、準確且有用。  

- Huggingface: 結了眾多NLP相關模型 [https://huggingface.co/](https://huggingface.co/)  
- transformer: 此NLP套件的核心在於transformers這個套件  
[reference](https://hackmd.io/@zjD2FEZmQnO8Pt7Q_305jQ/SJHrP3hVo)  

- Hugging Face Hub: 是分享机器学习模型、演示、数据集和指标的首选平台huggingface_hub库  
[huggingface_hub](https://huggingface.co/docs/huggingface_hub/main/cn/quick-start)  

- Semantic Kernel (SK，語義核心)  
Semantic search  
[Semantic Kernel](https://softnshare.com/microsoft-llm-opensource-semantic-kernel/)

# NVIDIA Jetson AI Lab  

[NVIDIA Jetson AI Lab](https://www.jetson-ai-lab.com/)  
Agent Studio


# 
[使用SK與Ollama實現本地LLM模型連接](https://medium.com/playtech/%E4%BD%BF%E7%94%A8sk%E8%88%87ollama%E5%AF%A6%E7%8F%BE%E6%9C%AC%E5%9C%B0llm%E6%A8%A1%E5%9E%8B%E9%80%A3%E6%8E%A5-60eb6c0c5fae)  

[使用KernelMemory、Ollama實作落地Language Model與Vector DB的RAG應用](https://medium.com/playtech/%E4%BD%BF%E7%94%A8kernelmemory-ollama%E5%AF%A6%E4%BD%9C%E8%90%BD%E5%9C%B0language-model%E8%88%87vctor-db%E7%9A%84rag%E6%87%89%E7%94%A8-f6a83278119a)  

# ollama docker  

        docker run --name ollama -v ollama:/root/.ollama -p 11434:11434 ollama/ollama

        docker exec -it ollama ollama run llama3:8b

# chat ollama    

[chat ollama](https://github.com/sugarforever/chat-ollama)  

[youtube](https://www.youtube.com/watch?v=x4qPdrgVb_Y)  

# Vector DB

[Chroma](https://docs.trychroma.com/getting-started)