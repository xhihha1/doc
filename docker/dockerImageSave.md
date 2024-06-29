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