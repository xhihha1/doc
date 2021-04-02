# docker jenkins  

https://github.com/jenkinsci/docker

    docker run --name myjenkins -v jenkins_home:/var/jenkins_home -p 8001:8080 -p 50001:50000 jenkins/jenkins:lts