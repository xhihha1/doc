# helm是什麼  

helm使用chart來建構部署你的服務，chart的資料架構如下  

    your_app
    ├── Chart.yaml
    ├── charts # 裡面放相依的chart設定檔
    ├── templates # 樣板
    │   ├── NOTES.txt # 
    │   ├── _helpers.tpl # golang的template
    │   ├── deployment.yaml # Kubernetes deployment
    │   ├── hpa.yaml # Kubernetes hpa
    │   ├── ingress.yaml # Kubernetes ingress
    │   ├── service.yaml # Kubernetes service
    │   ├── serviceaccount.yaml # Kubernetes serviceaccount
    │   └── tests
    │       └── test-connection.yaml
    └── values.yaml # 把原本hardcode寫死在yaml裡面的value抽出來放到values.yaml上面，部署時才把values.yaml的值渲染到yaml上面。


helm有以下特點  
- Manage Complexity : chart可以定義很複雜的應用程式。  
- Easy Updates : 昇級很輕鬆。  
- Simple Sharing : 很簡單的部署到不同環境。  
- Rollbacks : 要rollback版本很快速簡單。  

# helm install  

    brew install helm  

# 建立helm chart  

    helm create <mytest>

    helm install [RELEASE_NAME] [CHART] [flags]

# 查看狀態

    helm list 
    helm status <test1>

# 删除部署  

    helm uninstall <test1>
    helm uninstall -n <default> <test2>

# Helm 常用command  

以下指令應該是常常會操作到

    helm create : 建立chart
    helm intall : 安装chart
    helm uninstall : 反安裝chart
    helm lint : 檢查chart的yaml有沒有寫錯
    helm list : 列出helm install的chart
    helm rollback : 降版
    helm upgrade : 升阪

執行flag使用dry-run會把渲染後的yaml都印出來，如果有錯的話，執行時就會噴錯，可以順便檢查有沒有寫正確  

    helm install --dry-run --debug test2  ./mytest1

# helm rollback  

    helm rollback <test2> 1
    helm ls -A      # REVISION不會降回1喔，一樣是遞增上去
    helm history <test2>      # 使用history指令就可以看到test2已經rollback回1了