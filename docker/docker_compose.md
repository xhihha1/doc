有了 Docker 以後，就可以將專案的環境寫成 Dockerfile，到了有 Docker 的機器，就可以把專案所需的環境 build 起來。

通常你在 Docker Hub 上找到的容器，通常都是官方預設的設定；就算有人客製化一些容器，這些容器可能也不一定符合我們的需求。例如我們要改寫 Nginx 伺服器的設定檔 nginx.conf 的時候，可能就要先 docker run 一個 nginx，然後 docker exec -ti [id] bash 進去改寫 /etc/nginx/nginx.conf。

如果你看不懂 docker run、docker exec，可以回去閱讀 Docker 管理術(三)：啟動容器與基本指令

# Dockerfile 管理 Image  

這時候，Dockerfile 就能夠幫助我們建立自己的 Image，建好 Image 之後隨時要執行都沒有問題。例如剛剛的例子可以這樣寫成 Dockerfile：

    FROM nginx:latest

    COPY ./default.conf /etc/nginx/conf.d/default.conf

    EXPOSE 80

上面這個 Dockerfile 會基於最新版的 nginx 這個 Image，再複製一個我們目前資料夾下的 default.conf 檔案去覆蓋掉 Image 內的 /etc/nginx/conf.d/default.conf，最後把 PORT 80 expose 出來（讓外面的人可以連到 port 80）。  

Dockerfile 常用到的指令有：

- FROM：也就是你要基於哪個 Docker Image。  
例如：FROM debian  

- MAINTAINER：用來說明維護這個 Dockerfile 的人是誰。  
例如：MAINTAINER NoobTW noob@noob.tw  

- RUN：後面放建立這個 Image 需要執行的指令。需要注意你原本的 Image 有沒有這些指令就是了。  
例如：RUN curl http://npmjs.org/install.sh | sh  

- ADD：把目前資料夾的檔案複製到 Image 裡。如果是 tar.gz 檔，它還會自動幫你解壓縮。  
例如：ADD wordpress-latest-zh_TW.tar.gz /var/www/html/  

- COPY：把目前資料夾的檔案複製到 Image 裡面。  
例如：COPY package.json /usr/src/app/package.json  

- ENV：用來設定環境變數。  
例如：ENV PATH /root/.npm/node_modules:$PATH  

- CMD：使用者執行 docker run 時要執行的指令和參數。  
例如：CMD [ "npm", "start" ]  

- EXPOSE：要開放連進去的 port  
例如：EXPOSE 3306  

寫好以後可以透過這個指令去 build 成我們自己的 Image：

    docker build -t [作者]/[Image 名稱] [Dockerfile 資料夾]

例如：

    docker built -t NoobTW/mynginx .

這樣就能建立一個叫做 NoobTW/mynginx 的 Docker Image。想執行它的話只要：

    docker run -p 80:80 -d NoobTW/mynginx

就能看到這個 Container 開始執行了。

記住：雖然剛剛已經有 EXPOSE 80，但建立 Container 時還是要加個 -p 80:80 才能  

Docker Compose 一次執行多個 Docker Container  
如果在撰寫大型專案的時候，例如有個前後端分離的專案，同時又需要資料庫的 Container，可能就會有多個資料夾、多個 Dockerfile。  

例如你的資料夾結構長這樣：  

    ├ app/
    ├── src/
    ├── app.js
    ├── Dockerfile
    ├ api/
    ├── src/
    ├── server.js
    ├── Dockerfile
    ├ dbs/
    ├── mongo-backup/
    ├── Dockerfile
    ├ README.md

前端、後端、和資料庫工程師各把自己的部分寫完，並寫好了屬於自己的 Dockerfile，而你需要把這三個 Image build 起來並啟動這些容器的時候，就可以用寫一個 docker-compose.yml：  

    version: '3'

    services:
        api:
            depends_on:
                - db
            container_name: api
            build:
                context: ./api
                dockerfile: Dockerfile
            volumes:
                - './api:/usr/src/app'
                - '/usr/src/app/node_modules'
            restart: always
            ports:
                - 8080:8080
            environment:
                DB_HOST: db
        app:
            depends_on:
                - db
            container_name: app
            build:
                context: ./app
                dockerfile: Dockerfile
            volumes:
                - './api:/usr/src/app'
                - '/usr/src/app/node_modules'
            restart: always
            ports:
                - 80:3000
        db:
            container_name: db
            build:
                context: ./db
                dockerfile: Dockerfile
            volumes:
                - './db/:/db'
            restart: always
            ports:
                - 27017:27017

接著執行這個指令，就能夠自動 build 所有環境，並建立所有的 Container：  

    docker-compose up