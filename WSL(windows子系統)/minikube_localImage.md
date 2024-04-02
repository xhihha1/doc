# use an image without uploading it, you can follow these steps:

- Set the environment variables with `eval $(minikube docker-env)`
- Build the image with the Docker daemon of Minikube (e.g., `docker build -t my-image .`)
- find images(`docker images`)
- Set the image in the pod specification like the build tag (e.g., my-image)
- Set the imagePullPolicy to Never, otherwise Kubernetes will try to download the image.

## eval $(minikube docker-env)


將 docker 客戶端指向 minikube docker 進程，目的是為了在 Minikube 虛擬機中構建和運行 Docker 鏡像，而不是將其上傳到外部的 Docker 倉庫。  
Reuse the Docker daemon inside minikube cluster. This means you don’t have to build on your host machine and push the image into a docker registry. You can just build inside the same docker daemon as minikube which speeds up local experiments.  