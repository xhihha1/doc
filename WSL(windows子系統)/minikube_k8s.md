[https://cuteprogramming.blog/2023/05/21/using-docker-and-kubernetes-without-docker-desktop-on-windows-11/](https://cuteprogramming.blog/2023/05/21/using-docker-and-kubernetes-without-docker-desktop-on-windows-11/)

    minikube start

# 查看 minikube 起在哪個ip，建立 service  

        minikube status 
        # 查看 minikube-vm at ***.***.***.***

# minikube 使用root權限運行錯誤  

解法:  
1. Run Minikube as a non-root user  
2. Use the --force option  

    sudo minikube start --force  

3. Use the none driver  

    sudo minikube start --driver=none

