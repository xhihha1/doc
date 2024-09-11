更新包索引：  

        sudo apt-get update  

卸载旧版本：(如果你之前安装了旧版本的Docker，先将其卸载。)  

        sudo apt-get remove docker docker-engine docker.io containerd runc  

设置Docker官方的存储库：  

        sudo apt-get install \
            ca-certificates \
            curl \
            gnupg \
            lsb-release

添加Docker的GPG密钥：  

        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

设置稳定存储库：  

        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

更新包索引并安装最新版本的Docker引擎和容器：  

        sudo apt-get update
        sudo apt-get install docker-ce docker-ce-cli containerd.io

检查Docker是否安装成功：

        sudo docker run hello-world

安装或升级Docker Compose：  
首先删除旧版本的docker-compose（如果存在）：  

        sudo rm /usr/local/bin/docker-compose

然后下载最新版本的Docker Compose：

        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

赋予可执行权限：  

        sudo chmod +x /usr/local/bin/docker-compose

检查Docker Compose是否安装成功：  

        docker-compose --version


