# window 安裝 docker，從 WSL 2安裝開始

安裝 WSL 並更新至 WSL 2
https://docs.microsoft.com/zh-tw/windows/wsl/install-win10

開始使用 Docker 遠端容器
https://docs.microsoft.com/zh-tw/windows/wsl/tutorials/wsl-containers

https://stackoverflow.com/questions/43041331/docker-forever-in-docker-is-starting-at-windows-task


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
	
	