# nginx  

D槽目錄： `/mnt/d/nginx/conf.d`  
將`default.conf`放到對應目錄，啟動 nginx docker  

    docker run --name nginx-proxy -d -p 80:80 -v /mnt/d/nginx/conf.d:/etc/nginx/conf.d nginx  

# 检查容器日志  

    docker logs nginx-proxy

# 进入容器内部检查 Nginx 状态  

    docker exec -it nginx-proxy /bin/sh

```sh
# 查看 Nginx 是否在运行
ps aux | grep nginx

# 检查 Nginx 配置文件
cat /etc/nginx/nginx.conf
cat /etc/nginx/conf.d/default.conf

# 测试 Nginx 配置
nginx -t

# 查看 Nginx 的监听端口
netstat -tuln | grep 80

# 退出容器
exit

```

# 防火墙设置:

    sudo iptables -L -n

添加规则，可以执行以下命令：  

    sudo iptables -A INPUT -p tcp --dport 5000 -j ACCEPT
