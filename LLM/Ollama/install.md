# Ollama  

**Reference**  
[tourter](https://medium.com/@Tanzim/how-to-run-ollama-in-windows-via-wsl-8ace765cee12)  


Ollama is an open source library that provides easy access to large language models.  

    curl https://ollama.ai/install.sh | sh

The Ollama API is now available at 127.0.0.1:11434  

    ollama list  

    ollama --help  

Find models in [ollama models page](https://ollama.com/library).  

b: billion，模型參數的數量。一般而言，越高的參數數量的模型表現越好，但是同時也需要越大量的運算資源及記憶體。  
fp16: 參數最高精確度的模型，通常是表現最好的。  
q: 量化模型 (quantized models) 透過降低參數數值精準度來縮減模型大小，進而增加運算速度並減少記憶體的需求。一般而言，降低到 q6-q4都還能提供不錯的表現，但實際效果依模型而定。  

    ollama run <model_name>  

ex: use model **mistral**   

    ollama run mistral

    ollama list能顯示所有安裝在本機的模型  
    ollama rm <model_name>能刪除安裝的模型  
    ollama pull <model_name>能安裝或更新模型  
    ollama cp <model_name_1> <model_name_2>能複製模型，用來客製化不同的提詞 (prompts) 及不同的溫度 (temperature)。  

可以試著運行比較小的模型，例如 **orca-mini**   

# Run  

看到下列訊息則可以開始輸入 prompt  

    >>> Send a message (/? for help)

或是查看指令 `/?`  

    Available Commands:
      /set            Set session variables
      /show           Show model information
      /load <model>   Load a session or model
      /save <model>   Save your current session
      /clear          Clear session context
      /bye            Exit
      /?, /help       Help for a command
      /? shortcuts    Help for keyboard shortcuts

使用 save 會將目前內容儲存為新的 `model`  


[透過-ollama-在本地運行](https://medium.com/@liyiyuian/%E9%80%8F%E9%81%8E-ollama-%E5%9C%A8%E6%9C%AC%E5%9C%B0%E9%81%8B%E8%A1%8C-llm-60e0081ebdca)


# Ollama embedding-models  

    https://ollama.com/blog/embedding-models