# NATS  

# DOCKER 

[Docker](https://docs.nats.io/running-a-nats-service/nats_docker)  
```bash  
docker pull nats
docker run nats
```

By default the NATS server exposes multiple ports:  
- **4222** is for clients.  
- **8222** is an HTTP management port for information reporting.  
- **6222** is a routing port for clustering.  

```bash  
docker network create nats
docker run --name nats --network nats --rm -p 4222:4222 -p 8222:8222 nats --http_port 8222
```  

## Creating a NATS Cluster  
```bash
docker run --name nats --network nats --rm -p 4222:4222 -p 8222:8222 nats --http_port 8222 --cluster_name NATS --cluster nats://0.0.0.0:6222
```
Next, start additional servers pointing them to the seed server to cause them to form a cluster:  
```bash
docker run --name nats-1 --network nats --rm nats --cluster_name NATS --cluster nats://0.0.0.0:6222 --routes=nats://ruser:T0pS3cr3t@nats:6222
docker run --name nats-2 --network nats --rm nats --cluster_name NATS --cluster nats://0.0.0.0:6222 --routes=nats://ruser:T0pS3cr3t@nats:6222
```  


```bash
docker run -dit --name nats_demo --network workspace -p 4222:4222 -p 8222:8222 nats:2.10.24-linux --user wsadmin --pass wspwd -js --http_port 8222
```
`-js` is for JetStream.  
`--user` and `--pass` are for authentication.  
`-p 8222:8222` is for the management port.  
`-p 4222:4222` is for the client port.


```bash
(echo 'CONNECT {"user":"wsadmin","pass":"wspwd"}'; echo 'PING') | nc localhost 4222
```


# NATS CLI  
```bash
nats --server nats://wsadmin:wspwd@localhost:4222 sub test
nats --server nats://wsadmin:wspwd@localhost:4222 pub test "Hello World"
```

# NATS C# Client  
[NATS .NET](https://nats-io.github.io/nats.net/documentation/intro.html?tabs=core-nats)

## 步驟 1：建立專案  

```bash
dotnet new console -n IoTDBExample
cd IoTDBExample
```

```bash
dotnet add package NATS.Net --version 2.5.5
```


### 步驟 2：官網範例 
```csharp
using NATS.Net;
using NATS.Client.Core;

var url = "localhost:4222";
var username = "wsadmin";
var password = "wspwd";
// await using NatsClient nc = new NatsClient();
await using NatsClient nc = new NatsClient(new NatsOpts
{
  Url = url,
  AuthOpts = new NatsAuthOpts
  {
    Username = username,
    Password = password,
  }
});

// We will use a cancellation token to stop the subscription
using CancellationTokenSource cts = new CancellationTokenSource();

Task subscription = Task.Run(async () =>
{
    await foreach (NatsMsg<string> msg in nc.SubscribeAsync<string>(subject: "greet.*", cancellationToken: cts.Token))
    {
        Console.WriteLine($"Received: {msg.Subject}: {msg.Data}");
    }
});

// Give subscription time to start
await Task.Delay(1000);

for (int i = 0; i < 10; i++)
{
    await nc.PublishAsync(subject: $"greet.{i}", data: $"Hello, World! {i}");
}

// Give subscription task time to receive messages
await Task.Delay(1000);

// Unsubscribe
await cts.CancelAsync();

await subscription;
```
### 步驟 3：運行  
```bash
dotnet run
```
### 結果
```bash
Connect to localhost:4222 successfully
Received: greet.0: Hello, World! 0
Received: greet.1: Hello, World! 1
Received: greet.2: Hello, World! 2
Received: greet.3: Hello, World! 3
Received: greet.3: Hello, World! 3
Received: greet.4: Hello, World! 4
Received: greet.5: Hello, World! 5
Received: greet.6: Hello, World! 6
Received: greet.7: Hello, World! 7
Received: greet.8: Hello, World! 8
Received: greet.9: Hello, World! 9
```
### 可以使用  nats cli 測試
```bash
nats --server nats://wsadmin:wspwd@localhost:4222 sub greet.*
```  