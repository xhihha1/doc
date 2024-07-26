# 保存 Docker 镜像为 tar 文件：

      docker save -o /path/to/destination/image.tar <image_name>

- /path/to/destination/image.tar 是你希望保存的目标位置和文件名。  
- image_name 是你要保存的 Docker 镜像的名称或 ID。  

      docker save -o /home/user/images/my-image.tar my-image

## 将 tar 文件移动到目标目录：  

      mv /path/to/destination/image.tar /path/to/target/directory/

# 加载 Docker 镜像 tar 文件：  

      docker load -i /path/to/image.tar

- 验证加载的镜像：  

      docker images


# build & buildx, push

      docker build -t harbor.arfa.wise-paas.com/saas-composer-dev/saas-composer-dev:3.4.2 .  

      docker login $harbor_url -u $harbor_username -p $harbor_password  

      docker push harbor.arfa.wise-paas.com/saas-composer-dev/saas-composer-dev:3.4.1   

## build出現錯誤訊息  

        DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/


下载并安装正确的二进制文件：

      mkdir -p ~/.docker/cli-plugins
      curl -Lo ~/.docker/cli-plugins/docker-buildx https://github.com/docker/buildx/releases/download/v0.16.2/buildx-v0.16.2.linux-amd64
      chmod +x ~/.docker/cli-plugins/docker-buildx

验证 Docker Buildx 是否安装成功：

      docker buildx version

你应该看到类似于以下的输出：

      github.com/docker/buildx v0.16.2 123456789abcd

创建并使用 Buildx Builder  
如果还没有创建 Buildx Builder，请创建一个并启用它：  

      docker buildx create --name mybuilder --use
      docker buildx inspect --bootstrap

      docker buildx build --platform linux/amd64,linux/arm64 -t harbor.arfa.wise-paas.com/saas-composer-dev/saas-composer-dev:3.4.2 .