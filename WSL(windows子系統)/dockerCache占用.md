1. 解決 cache太大
2. 縮小 wsl

# 解決 cache太大  
# 檢查 WSL 與 Docker 佔用空間  

## Step 1：檢查 Docker 使用量   

```
docker system df
```

## Step 2：清理 Docker   

### 清除未使用的 image、container、volume  
```
docker system prune -a
```

### 若只想清除 volume  
```
docker volume prune
```

`-a` 會清掉所有未被使用的 image，建議先確認重要 image 是否有 tag 起來！


### 清除所有 build cache：

```bash
docker builder prune
# 完全清掉所有 builder cache
docker builder prune -a
```

### Build 時可加上 --no-cache 減少 cache 產生
```
docker build --no-cache .
```

## Step 3：找出 WSL 的 .vhdx 檔案大小  
```
C:\Users\<你的帳號>\AppData\Local\Packages\CanonicalGroupLimited...（Ubuntu）
```

## Step 4：壓縮 WSL2 的虛擬硬碟（可釋放磁碟空間）  
```
wsl --shutdown
```

開啟 PowerShell，輸入：  
```
cd "C:\Users\<你的帳號>\AppData\Local\Packages\<你的 WSL distro>\LocalState"
optimize-vhd -Path .\ext4.vhdx -Mode Full
```

使用 PowerShell 壓縮 `.vhdx`  
```powershell  
Optimize-VHD -Path "C:\Users\<你的帳號>\AppData\Local\Packages\...\LocalState\ext4.vhdx" -Mode Full
```
### 無法辨識 'Optimize-VHD' 詞彙是否為 Cmdlet  
### 安裝 Hyper-V 模組
打開 PowerShell（以管理員身份執行）並執行以下命令來安裝 Hyper-V 模組：  
 ```powershell
 Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -All
 ```