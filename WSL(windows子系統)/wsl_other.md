
# WSL  

[https://learn.microsoft.com/zh-tw/windows/wsl/basic-commands](https://learn.microsoft.com/zh-tw/windows/wsl/basic-commands)

# Linux讀取windows

        cd /mnt/c

# 檔案總管存取Linux  

        \\wsl.localhost\

# wsl 中執行 windows 程式、檔案

        powershell.exe /c start


# 在 Windows 子系統 Linux 版上執行 Linux GUI 應用程式  

[https://learn.microsoft.com/zh-tw/windows/wsl/tutorials/gui-apps](https://learn.microsoft.com/zh-tw/windows/wsl/tutorials/gui-apps)

![GUI](./GUI.png)  

# 條列  

        wsl --list --verbose
        wsl -l -v

# 使用  

        wsl -d <發行版名稱>
        wsl -d Ubuntu-22.04
        wsl --distribution Ubuntu-22.04

## 使用預設發行版  

        wsl

更改預設發行版

        wsl --set-default <發行版名稱>
        wsl --set-default Ubuntu-22.04


# 先停止指定的 WSL 發行版  

        wsl --terminate <發行版名稱>
        wsl --terminate Ubuntu-22.04

# 刪除

        wsl --unregister <發行版名稱>
        wsl --unregister Ubuntu-22.04