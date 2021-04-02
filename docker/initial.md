# Docker

Docker 產生 VM (OS Level)

## 基本觀念  

名詞：  

- **Image 映像檔**：Docker 都是唯讀的 Image，Image 執行(instance) 產生 Container  
- **Container 容器**：Container 可以 run、start、stop、rm，每個 Container 都是獨立分離的。- Image 是唯讀的，所以 Container 啟動時，會在上面建立一層可以寫入的層級。(最多寫入127層)  
- **Registry 倉庫** (Public / Private) https://hub.docker.com/ # Image 預設都由此處抓取  

運作使用流程：  

1. 由 Registry 抓取 Image 到 Local 端，可以把 Image 想成是作業系統的 IMG、ISO 檔  
2. 啟動此作業系統(Image) 會產生 Container (實體化)  
    註1：一個 Image 可以產生、執行出多組 Container (同一個 VM 可以多重執行，執行當下會產生 Container，Container 上面會有自己寫入的 aufs 層級)  
    註2：可以想像 Container 就是 Image 上面的一層 Layer  


## Docker 常用命令  

[Docker Command](https://docs.docker.com/engine/reference/commandline/docker/)  
[Use the Docker command line](https://docs.docker.com/engine/reference/commandline/cli/)  

### DOCKER 版本資訊  
docker version
docker info

### DOCKER 搜尋 IMAGE  
docker search image-name
docker search debian
docker search nginx

### DOCKER 抓取 IMAGE  
docker pull ubuntu # 抓所有 ubuntu image 回來, tag 可於後面附加上去
docker pull ubuntu:16.04 # 只抓取 Ubuntu 16.04 的 Image
docker pull debian:jessie
docker pull debian:latest # library/debian - Docker Hub，latest 只會抓最新版 (Debain Docker 官方版)
docker pull ubuntu:latest # library/ubuntu - Docker Hub

### DOCKER 列出 LOCAL IMAGES  
docker images # 列出 images

### DOCKER 啟動 IMAGE 產生 CONTAINER (START)  
docker start hash-id # docker ps -a 看到想要讓他執行，可以直接 start

### DOCKER 暫停 IMAGE 產生 CONTAINER (STOP)  
docker stop hash-id # 此 hash-id 由 docker ps 可找到

### DOCKER 執行 IMAGE 產生 CONTAINER (RUN)  
- docker run  
- docker run -d debian:jessie  
    會自動執行 docker pull + 啟動並進入背景執行  
- docker run -it debian:jessie bash 
    會自動執行 docker pull，跑起來自動執行 bash 程式進入此 Container  
- docker run --rm debian:jessie bash  
    Container 執行停止(docker stop container-name)後，會自動移除  
- docker run -d -p 80:80 nginx 
    把裡面的 80 port 導到外面的 80 port (host Port:container Port)  
- docker run ubuntu:trusty /bin/echo "hello world"  
    說明如下  
    image name：ubuntu:trusty  
    execute：/bin/echo  
    argument："hello world"  
- docker run ubuntu:latest /bin/sh -c "while true; do echo hello, world; sleep 1; done;"  
- docker run -d ubuntu:latest /bin/sh -c "while true; do echo hello, world; sleep 1; done;"  
    -d 會進入背景執行
- docker run -d ubuntu:latest /bin/sh -c "apt install apt-utils; done;"  
    安裝套件  
- docker run -it --name test ubuntu  
    指定名稱  
- docker run -d -p 3306:3306 -e MYSQLROOTPASSWORD=1234 mysql 
    指定 port 與 密碼  
    mysql -u root -p1234 -h 172.17.42.1  
    於外部可直接連進 Docker 內部 MySQL  
- docker run -d -p 3307:3306 -e MYSQLROOTPASSWORD=1234 mysql  
    本機 3307 對應到 docker 3306  
    mysql -u root -p1234 -P 3307 -h 172.17.42.1  
- docker run -d --name web -m 512m -p 8080:80 nginx  
    限制記憶體大小
- docker run -d --expose=80 --name nginx-web nginx
- docker run -d -v $(pwd)/project:/var/www --rm --name container-name -p 80:80 container-name  
    綜合上述，啟動執行，docker stop 順便移除

### DOCKER 執行 CONTAINER 某命令 (EXEC)  
docker exec hash-id /sbin/ifconfig  
docker exec -t hash-id /bin/bash  
docker exec -it debian:latest /bin/bash  
docker exec -it debian:latest /sbin/ifconfig  

### DOCKER 掛載目錄進入 CONTAINER (RUN -V)  
docker -v 掛載點  
docker run -d --name xxx -p 80:80 -p 3306:3306 -v /mnt/xxx:/mnt debian:jessie  
    /mnt/xxx：目前 Local 環境目錄  
    /mnt：Container 目錄  

### DOCKER 產生、操作 VOLUMES (VOLUME)  
docker volume create --name myvol # 建立 local volume  
docker run -v myvol:/data # Container start 就 Mount 此 volume  
docker volume rm myvol # 砍掉 volume  
docker volume ls # 列出 volumes  

### DOCKER 列出 CONTAINER (PS)  
docker ps # 還在執行中的 Container，可以看到詳細 hash id  
docker ps -a # 執行、停止的 Container 都列出來  
docker ps -l -q # 只列出 hash id，常用，可考慮加入 .bashrc：alias dl='docker ps -l -q'  

### DOCKER 進入(ATTACH) CONTAINER  
docker attach hash-id # -d 模式後，attach hash id 會回到此 conatiner console，"ctrl-p, ctrl-q detach".  
註：attach 進去此 Container，若沒有用 detach 而是 exit 離開，此 Container 也會跟著離開結束  

### DOCKER 列出 LOGS  
docker logs hash-id  
docker logs -f hash-id  

### DOCKER 刪除 CONTAINER (RM)    
docker rm hash-id # CONTAINER ID  
docker rm -f hash-id # 強置刪除  
docker rm $(docker ps --filter status=exited -q) # 砍掉所有停止的 Container  
docker rm $(docker ps -a -q) # 移除所有 Containers  
docker ps --filter "status=exited" | grep 'weeks ago' | awk '{print $1}' | xargs --no-run-if-empty docker rm # 一次砍掉狀態是 exited，而且是幾週前的 container  
docker ps -a | awk '{print $1}' | xargs --no-run-if-empty docker rm # ps -a 砍掉全部 stop 的 container  

### DOCKER 刪除 IMAGES (RMI)  
docker rmi image-id # docker images 可以看到 image-id  
docker rmi -f image-id # 強置刪除  
docker rmi $(docker images -q) # 移除所有 docker images  
docker rmi docker images -qa # 移除所有 docker images  
docker rmi $(docker images -f "dangling=true" -q) # 砍所有沒有 tag 的 image  

### DOCKER 查看 CONTAINER 詳細資訊 (INSPECT)  
docker inspect mysql  
docker inspect mysql | grep IPAddre # 想抓取 ip  
DOCKFILE 產生 IMAGE(BUILD)、由 CONTAINER 產生 IMAGE (COMMIT)  
docker build -t myimage . # build image，需要 Dockerfile  
docker build -t user-name/v1.0.0 .  
docker commit hash-id myimage # 由 Container 產生 Image  
docker commit -m 'commit-message' hash-id tsung/myimage:tag-name # 用此 hash-id 現在的內容包成 Image (tsung/myimage)，同時設定 Tag tag-name  

### DOCKER 將 CONTAINER 重新命名 (RENAME)  
docker rename hash-id new-name  

### DOCKER 從 CONTAINER 複製檔案出來 (CP)  
docker cp hash-id:/etc/group /tmp # Container-id:path local-storage  

### DOCKER 儲存當下環境的 IMAGE 到 TAR - (SAVE)  
docker save image-name > image-name.tar # 存 Image  
docker save -o debian.tar debian:jessie  
docker save -o ubuntu.tar ubuntu:lucid ubuntu:saucy  
註：save 儲存當下 Image 變動部份，與原始 Image 是分開的 (存映像檔，包成 Image)  

### DOCKER 由 TAR 還原回 IMAGE (LOAD)  
docker load < image-name.tar # save tar  
註：Load an image from a tar archive or STDIN  

### DOCKER 儲存當下環境的 IMAGE(含原始 IMAGE) 到 TAR (EXPORT)  
docker export image-name > image-name.tar  
docker export --output="image-name.tar" image-name  
註：只要有此 tar 檔，到其它機器都可以直接立刻使用 (把現在的環境打包，當下的 container)  

### DOCKER 由 TAR 還原回 CONTAINER (IMPORT)  
docker import < image-name.tar # 直接建立一個新的 Container  
cat image-name.tar | docker import - local/image-name # image-name.tar = export tar  
註：Import the contents from a tarball to create a filesystem image  

### DOCKER 查看 CONTAINER PORTS (PORT)
docker port hash-id # 80/tcp -> 0.0.0.0:80  

### DOCKER 查看 CONTAINER PROCESS (TOP)
docker top hash-id # 秀出 Container 正在執行的 process  

### DOCKER 砍掉正在跑得 CONTAINER (KILL)
docker kill hash-id  
docker kill $(docker ps -q) # 停止所有 Containers  

### 執行 Docker 不需 sudo 的設定方式  
vim /etc/group # 將帳號加入 docker group 就不會每次都需要 sudo  
docker:x:999:username  
或 sudo gpasswd -a ${USER} docker # 將自己此帳號加入 docker group  
sudo service docker restart  


## 參考資料  

[Docker 初學筆記 - 基本指令操作教學](https://blog.longwin.com.tw/2017/01/docker-learn-initial-command-cheat-sheet-2017/)  

[Docker Doc](https://docs.docker.com/)  

[DockerHub](https://hub.docker.com/search?q=&type=image)  

[Official Images on Docker Hub](https://docs.docker.com/docker-hub/official_images/)  

[Docker 教學](https://ithelp.ithome.com.tw/articles/10199339)  