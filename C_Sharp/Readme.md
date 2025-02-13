# C#

- 安裝 .NET SDK
[下載並安裝適合你的作業系統的 .NET SDK](https://dotnet.microsoft.com/zh-tw/download)

VSCode  
1. 安裝套件 C# Dev Kit
2. 按照 Get started with C# Dev Kit 步驟進行


## 新建 console 專案  

```bash
dotnet new console -n HelloWorld
```

`Program.cs`  
```csharp
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
```

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Welcome to HelloWorld Program!");
    }
}

```

`HelloWorld.csproj`  
描述：專案檔案，定義了專案的設定與依賴項。  
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
  </PropertyGroup>

</Project>
```
關鍵元素：

`<OutputType>`：指定專案的輸出類型，Exe 表示生成可執行檔。
`<TargetFramework>`：目標框架版本，例如 net7.0 表示 .NET 7。

- obj/HelloWorld.csproj.nuget.dgspec.json
  // 描述：由 .NET 工具生成的臨時檔案，用於管理 NuGet 包（依賴項）。  
- obj/HelloWorld.csproj.nuget.g.targets
  // 描述：這是一個目標檔案，定義了編譯期間需要執行的特定目標指令。
- obj/HelloWorld.csproj.nuget.g.props  
  // 描述：這是一個屬性檔案，包含了專案中 NuGet 相關依賴項的屬性設置。
- obj/project.assets.json  
  // 描述：這是一個重要的 JSON 檔案，包含了專案中的所有 NuGet 依賴項及其解析結果。  
- obj/project.nuget.cache  
  // 描述：這是一個快取檔案，用於加速 NuGet 還原過程。   

清理和重建時會重新生成：如果遇到問題，可以刪除 obj 和 bin 資料夾，然後執行以下指令：
```bash
dotnet clean
dotnet restore
dotnet build
```

## 其他指令  

```bash  
dotnet run
dotnet clean
dotnet build
```


如何添加依賴項（NuGet 包）？  
```bash
dotnet add package PackageName
```
```bash
dotnet add package Newtonsoft.Json
```

列出已安裝的包：  
```bash
dotnet list package
```

如何切換到發佈模式？  
```bash
dotnet publish -c Release
```

### 如何檢查依賴項版本或問題？   
打開 `obj/project.assets.json` 檢查所有解析的依賴項。   
```bash
dotnet list package
```
NuGet 還原失敗，無法生成這些檔案？  
確保你的網路正常，並執行以下指令重新還原依賴項：  
```bash
dotnet restore
```





# NuGet 的應用範例
1. 新增 JSON 支援

  - 安裝 Newtonsoft.Json 包來處理 JSON：
    ```bash
    dotnet add package Newtonsoft.Json
    ```
  - 在程式中使用：
    ```csharp
    using Newtonsoft.Json;
    
    var data = new { Name = "Ken", Age = 30 };
    string json = JsonConvert.SerializeObject(data);
    Console.WriteLine(json);
    ```