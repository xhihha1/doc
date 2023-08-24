# win10 安裝 WSL 功能

## 1. 開啟開發者模式  

左下角 > 設定 > 更新和安全 > (右側選單)開發人員專用 > "開啟"開發人員模式  

進入下方 **2**，微軟官方教學，參照**手動安裝**，如果失敗回頭參照**註 url**  

**註：**  
[手把手教你启用Win10的Linux子系统](https://blog.csdn.net/zhangdongren/article/details/82663977)  
[介紹好用工具：WSL (Windows Subsystem for Linux)](https://blog.miniasp.com/post/2019/02/01/Useful-tool-WSL-Windows-Subsystem-for-Linux)  
 

## 2. window 安裝 docker，從 WSL 2安裝開始

安裝 WSL 並更新至 WSL 2
[https://docs.microsoft.com/zh-tw/windows/wsl/install-win10](https://docs.microsoft.com/zh-tw/windows/wsl/install-win10)

開始使用 Docker 遠端容器
[https://docs.microsoft.com/zh-tw/windows/wsl/tutorials/wsl-containers](https://docs.microsoft.com/zh-tw/windows/wsl/tutorials/wsl-containers)

WSL 2採用了輕量級虛擬機器的執行方式，故安裝的Linux系統會被儲存成vhdx檔，而非像一版的目錄階層。WSL 1中的`rootfs`已經不存在了。  
存取`windows`磁碟機上的檔案，則非常的方便，以「`C:\Windows`」來說，在這個環境下的路徑就是「`/mnt/c/Windows`」  

Linux 子系統搞爛了要怎麼辦？微軟有提供「lxrun」這個指令，可以用來管理這個子系統；當有問題的時候，可以透過「lxrun /uninstall」把整個子系統移除，然後再重新執行「lxrun /install」，就可以恢復到初始狀態了。  

[https://stackoverflow.com/questions/43041331/docker-forever-in-docker-is-starting-at-windows-task](https://stackoverflow.com/questions/43041331/docker-forever-in-docker-is-starting-at-windows-task)

[適用於Linux的Windows子系統(Windows Subsystem for Linux；WSL)](https://www.lijyyh.com/2020/07/linuxwindowswindows-subsystem-for.html)  
[Bash on Ubuntu on Windows 的簡單使用](https://kheresy.wordpress.com/2016/04/12/bash-on-ubuntu-on-windows/)  
[Windows下安装Ubuntu子系统的目录位置](https://blog.csdn.net/weixin_44623594/article/details/106419008)  
[在 Windows 10 上運行 Ubuntu Linux 子系統並將系統移動至其他硬碟](https://medium.com/@chenwy0806/%E5%9C%A8-windows-10-%E4%B8%8A%E9%81%8B%E8%A1%8C-ubuntu-linux-%E5%AD%90%E7%B3%BB%E7%B5%B1%E4%B8%A6%E5%B0%87%E7%B3%BB%E7%B5%B1%E7%A7%BB%E5%8B%95%E8%87%B3%E5%85%B6%E4%BB%96%E7%A1%AC%E7%A2%9F-57e8faaa3e04)  


# 錯誤處理  

**Q:**

執行 docker search、 docker run 出現**i/o timeout**  

	Error response from daemon: i/o timeout 

遇到這個狀況可能是 `docker subnet` 造成的問題  

**Ans.**

進入 docker desktop > setting > Resources > NETWORK  

修改 **docker subnet**，例：

	192.168.66.0/28





# Docker Desktop Getting Start

Clone the repository by running Git in a container.  

	docker run --name repo alpine/git clone http://github.com/docker/getting-started.git
	docker cp repo:/git/getting-started/  

Now, build the image  
A Docker image is a private file system just for your container. It provides all the files and code your container needs.  

	cd getting-started  
	docker build -t docker101tutorial  
	
Run your first container  
Start a container based on the image you built in the previous step. Running a container launches your application with private resources, securely isolated from the rest of your machine.  

	docker run -d -p 80:80 --name docker-tutorial docker101tutorial

Now save and share your image  
Save and share your image on Docker Hub to enable other users to easily download and run the image on any destination machine.  

	docker tag docker101tutorial kenyek/docker101tutorial
	docker push kenyek/docker101tutorial  
	
	

# Windows 上的 Kubernetes  

[Windows 上的 Kubernetes](https://docs.microsoft.com/zh-tw/virtualization/windowscontainers/kubernetes/getting-started-kubernetes-windows)

https://docs.microsoft.com/zh-tw/virtualization/windowscontainers/kubernetes/getting-started-kubernetes-windows

[Kubernetes 对 Windows 的支持](https://kubernetes.io/zh/docs/setup/production-environment/windows/intro-windows-in-kubernetes/)

https://kubernetes.io/zh/docs/setup/production-environment/windows/intro-windows-in-kubernetes/

