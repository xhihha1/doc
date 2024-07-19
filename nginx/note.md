# nginx  

D槽目錄： `/mnt/d/nginx/conf.d`  
將`default.conf`放到對應目錄，啟動 nginx docker  

    docker run --name nginx-proxy -d -p 80:80 -v /mnt/d/nginx/conf.d:/etc/nginx/conf.d nginx  

