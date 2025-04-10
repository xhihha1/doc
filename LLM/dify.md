# virtualbox 安裝 linux 運行 docker compose，安裝 Dify  

## Step 1  

下載並安裝 Ubuntu Server / Debian / CentOS

建議選擇 Ubuntu Server 22.04 LTS  
設定：  
CPU：2 核心以上  
RAM：4GB 以上  
硬碟：50GB 以上  
網路設定：選擇 **橋接模式 (Bridged Adapter)**，讓虛擬機獲得與主機相同的區網 IP。  

## step 2  

```sh
# 更新系統
sudo apt update && sudo apt upgrade -y

# 安裝 Docker
curl -fsSL https://get.docker.com | sudo bash

# 設定 Docker 權限，避免每次都要 sudo
sudo usermod -aG docker $USER
newgrp docker

# 安裝 Docker Compose
sudo apt install -y docker-compose

# 確認版本
docker --version
docker-compose --version

```

## step 3 : 安裝 Dify / 啟動 Dify  

安裝 Dify  
```sh
git clone https://github.com/langgenius/dify.git
cd dify
```
啟動 Dify  
```sh
docker compose up -d
```

## step 4 : 主機連接 Dify  

獲取虛擬機 IP  

```sh  
ip a | grep inet
```
找到 eth0 或 ensXXX 介面對應的 IP，例如 192.168.1.100。  

```sh  
http://192.168.1.100:8000
```
Dify起在 **80 port**  

# 重啟Virtualbox之後如何重新啟動dify docker compose  

```sh
docker compose up -d
```

# VirtualBox 退出滑鼠整合的方法

按下 Host 鍵 (預設為 Right Ctrl)  

Windows / Linux 主機：右 Ctrl (Right Control)  
macOS 主機：左 Command (⌘) (Left Command)  


# 讓 Ollama 監聽所有 IP  

```sh
ollama stop
export OLLAMA_HOST=0.0.0.0:11434
ollama serve
```
```powershell
$env:OLLAMA_HOST="0.0.0.0:11434"
```

讓設定永久生效  
```sh
echo 'export OLLAMA_HOST=0.0.0.0:11434' >> ~/.bashrc
source ~/.bashrc
```

使用 PowerShell 設定環境變數
```powershell
[System.Environment]::SetEnvironmentVariable("OLLAMA_HOST", "0.0.0.0:11434", "User")
```
如果要刪除：
```powershell
[System.Environment]::SetEnvironmentVariable("OLLAMA_HOST", $null, "User")
```