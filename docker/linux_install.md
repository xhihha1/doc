# docker 安裝 linux  

[《Docker —— 從入門到實踐­》正體中文版](https://philipzheng.gitbook.io/docker_practice/install/centos)  


docker run --privileged --name centos7 -v /sys/fs/cgroup:/sys/fs/cgroup:ro -p 80:80 -d centos /usr/sbin/init

docker run --privileged --name centos7 -v /mnt/d/testContainer:/var/parents -p 8002:80 -d centos /usr/sbin/init