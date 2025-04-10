 
 # 讓 Ollama 監聽所有 IP  

 Ollama 預設只允許本機 (127.0.0.1) 存取  
 我們可以透過 修改 OLLAMA_HOST 設定 或 使用 Nginx 反向代理 來讓 VM 中的 Dify 也能使用 Ollama。  

 1. 停止當前的 Ollama 服務  
```sh  
ollama stop  
```  
2. 設定 OLLAMA_HOST 讓 Ollama 監聽所有網卡  
執行以下指令：  
```sh  
export OLLAMA_HOST=0.0.0.0:11434  
ollama serve  
```

## PowerShell 設定 OLLAMA_HOST   
如果你要在 當前 PowerShell 視窗 設定：  

```powershell  
$env:OLLAMA_HOST="0.0.0.0:11434"  
```  

方法 1：使用 PowerShell 設定環境變數   
執行：  

```powershell  
[System.Environment]::SetEnvironmentVariable("OLLAMA_HOST", "0.0.0.0:11434", "User")  
```  
這樣設定後，即使重開機，變數仍然會生效。  
要確認是否成功：  

```powershell  
$env:OLLAMA_HOST  
```  

如果要刪除：  
```powershell   
[System.Environment]::SetEnvironmentVariable("OLLAMA_HOST", $null, "User")   
```  