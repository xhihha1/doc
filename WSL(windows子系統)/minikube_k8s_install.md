# minikube 安裝(wsl)

[https://minikube.sigs.k8s.io/docs/](https://minikube.sigs.k8s.io/docs/)  

To install the latest minikube stable release on x86-64 Linux using binary download:  

    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64

# Start your cluster  

    minikube start

使用 Docker 作為驅動程式啟動 Minikube：  

    minikube start --driver=docker

# kubectl install  

[https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

- Download  

    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

- Validate the binary (optional)  

    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"

- Install kubectl  

    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

- Test to ensure the version you installed is up-to-date  

    kubectl version --client

or 

    kubectl version --client --output=yaml



# 列出一个或多个资源  

    kubectl get po -A  
    minikube kubectl -- get pods -A

# kubectl tool infomation  

[https://kubernetes.io/zh-cn/docs/reference/kubectl/](https://kubernetes.io/zh-cn/docs/reference/kubectl/)  

    kubectl get namespaces  

    kubectl get nodes  

    kubectl get pods -n <namespace>

# Deploy applications(minikube)   

创建部署：  

    kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0

暴露服务：  

    kubectl expose deployment hello-minikube --type=NodePort --port=8080

访问服务：  

    minikube service hello-minikube

Alternatively, use kubectl to forward the port:
端口转发（可选）：  

    kubectl port-forward service/hello-minikube 7080:8080

windows網頁直接開啟 `127.0.0.1:7080` 可以連上  

刪除  

    kubectl delete deployment hello-minikube

# manage cluster  

    minikube pause
    minikube unpause
    minikube stop

Change the default memory limit (requires a restart):  

    minikube config set memory 9001

Browse the catalog of easily installed Kubernetes services:

    minikube addons list

Create a second cluster running an older Kubernetes release:

    minikube start -p aged --kubernetes-version=v1.16.1

Delete all of the minikube clusters:

    minikube delete --all