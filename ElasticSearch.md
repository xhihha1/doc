# ElasticSearch  

[下載位置](https://www.elastic.co/downloads/elasticsearch)  

## Start Elasticsearch

        Run bin/elasticsearch (or bin\elasticsearch.bat on Windows)

## config  

`config/elasticsearch.yml` 配置連線設定  

預設會開啟 ssl 模式，要使用https才能連線，需要把對應的設定關閉  

        # Enable security features
        xpack.security.enabled: false

        xpack.security.enrollment.enabled: false

        # Enable encryption for HTTP API client connections, such as Kibana, Logstash, and Agents
        xpack.security.http.ssl:
        enabled: false
        keystore.path: certs/http.p12