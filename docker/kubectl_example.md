

    # my-first-pod.yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: my-pod
      labels:
        app: webserver
    spec:
      containers:
      - name: pod-demo
        image: zxcvbnius/docker-demo
        ports:
        - containerPort: 3000
        env:
        - name: POSTGRES_HOST
          value: "172.16.8.131"

- apiVersion  
  apiVersion 是代表目前 Kubernetes 中該元件的版本號。以上述的例子 Pod 是 v1，而 v1也是目前Kubernetes中核心的版本號。在日後也會陸續看到 betav1, v1alpha1 等版本號，更多 Kubernetes API 的版本號，可至 官網 API versioning查看。  

- metadata  
在 metadata 中，有三個重要的 Key，分別是 name, labels, annotations。

  - metadata.name  
    我們可以在 metadata.name 的欄位指定這個 Pod 的名稱，這裡 Pod 的名稱就是 my-pod
  - metadata.labels  
    而 metadata.labels 是 Kubernetes 的是核心的元件之一，Kubernetes 會透過 Label Selector 將Pod分群管理。
  - metadata.annotations  
    annotations 的功能與 labels 相似。相較於labels，annotations 通常是使用者任意自定義的附加資訊，提供外部進行查詢使用，像是版本號，發布日期等等。

- spec  
最後 spec 的部分則是定義 container，在這個範例中，一個 Pod 只運行一個 container。

  - container.name  
  我們可以在這 container 中設定 container 的名稱
  - container.image  
  Image 則是根據 Docker Registry 提供的可下載路徑。
  - container.ports  
  最後 ports 的部分則是可以指定，該 container 有哪些 port number 是允許外部資源存取，而在這裡我們只允許container中的port 3000對外開放。
  - container.env  
  設定環境變數  


# 使用 kubectl create 指令在 Kubernetes Cluster 中建立 Pod 物件  

    kubectl create -f /mnt/d/git/k8s/my-first-pod.yaml

# 查看狀態

    kubectl get pods  
    kubectl describe pod my-pod  
    kubectl describe pod <pod>  

# port forward 與 container 互動將port映射到外面    

    kubectl port-forward my-pod 8700:3000
    kubectl port-forward <pod> <external-port>:<pod-port>

# 建立 service (kubectl expose)  

    kubectl expose pod my-pod --type=NodePort --name=my-pod-service
    kubectl expose pod <pod> --port=<port> --name=<service-name>

# 使用 minikube 映射 url (讓外部服務能使用url連到)  
    
    minikube service my-pod-service --url
    minikube service --all

# 進到 container 內部去看 logs，可以使用 kubectl attach 這個指令  

    kubectl attach <pod> -i

# 對 Pod 下一個內部指令  

    kubectl exec <pod> -- <command>
    kubectl exec my-pod -- ls /app

# 新增 Pod 的 Labels  

    kubectl get pod --show-labels
    kubectl label pods my-pod version=latest
    kubectl label pods <pod> <label-key>=<label-value>

# 刪除 pod  

    kubectl delete pod my-pod
    kubectl delete pod --all --all-namespaces


# Replication Controller 建立 pods  

    apiVersion: v1
    kind: ReplicationController
    metadata:
      name: my-replication-controller
    spec:
      replicas: 3
      selector:
        app: hello-pod-v1
      template:
        metadata:
          labels:
            app: hello-pod-v1
        spec:
          containers:
          - name: my-pod
            image: zxcvbnius/docker-demo
            ports:
            - containerPort: 3000

- spec.replicas & spec.selector  
  在spec.replicas中，我們必須定義Pod的數量，以及在spec.selector中指定我們要選擇的Pod的條件(labels)。

- spec.template  
  在spec.template中我們會去定義pod的資訊，包含Pod的labels以及Pod中要運行的container。

- spec.template.metadata  
  則是Pod的labels，metadata.labels必須被包含在select中，否則在創建Replication Controller物件時，會發生error。

- spec.template.spec  
  最後spec的部分則是定義container，可以參考 Pod的yaml檔 的範例，在我們的範例中，一個Pod只有一個container。

# 查看 replication controller 建立狀態

    kubectl get rc

# 刪除 replication controller 建立的 pods  

    kubectl get rc
    kubectl delete rc <replication_controller_name>
    
    ## 希望刪掉replication controller之後，這些Pod仍然運行，可以指定 --cascade=false
    kubectl delete rc my-replication-controller --cascade=false

# kubectl scale來scaling Pod的數量  

    kubectl scale --replicas=4 -f ./my-replication-controller.yaml


# kubectl create v.s. kubectl apply  

`kubectl create` 只能用于创建新的资源对象，而 `kubectl apply` 可以用于创建新的资源对象或更新现有资源对象。  

    kubectl apply -f myfile.yaml 


