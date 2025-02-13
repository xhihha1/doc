1. 建立 ASP.NET Core MVC 專案
  步驟：
  打開命令列，導航到你希望建立專案的目錄。

  執行以下命令來創建 ASP.NET Core MVC 專案：


  ```bash
  dotnet new mvc -n HelloWorldMvc
  ```
  -n HelloWorldMvc：指定專案名稱為 HelloWorldMvc。
  mvc：使用 mvc 模板，生成 ASP.NET Core MVC 應用。
  專案生成後，導航到專案目錄：


  ```bash
  cd HelloWorldMvc
  ```
  在 VS Code 中打開專案目錄：


  ```bash
  code .
  ```
  還原依賴項：


  ```bash
  dotnet restore
  ```
## 2. 預設初始檔案的作用
新建的 ASP.NET Core MVC 專案包含以下核心檔案：

  1. Program.cs
    作用：應用程式的入口點，配置和啟動 ASP.NET Core 應用。
    預設內容：

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```
    功能：
    註冊 MVC 控制器和視圖服務（AddControllersWithViews）。
    配置中間件管道（如靜態檔案、路由和錯誤處理）。
    設置預設路由（Home 控制器的 Index 方法）。

  2. `appsettings.json`  
    作用：存儲應用程式的設定資訊（例如數據庫連接字串、應用設定等）。
    預設內容：

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

  3. `Controllers/HomeController.cs`

    作用：定義 MVC 控制器，處理請求並返回相應的視圖或資料。
    預設內容：

```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }
}
```
    功能：
    提供 Index 和 Privacy 兩個動作方法，分別返回對應的視圖。  

  4. Views 資料夾
    作用：存放視圖檔案（HTML 界面）。
    預設結構：

```vbnet
Views/
  Home/
    Index.cshtml
    Privacy.cshtml
  Shared/
    _Layout.cshtml
    Error.cshtml
```
    - `Index.cshtml` 和 `Privacy.cshtml`：對應控制器中的動作方法。
    - `_Layout.cshtml`：定義網站的共享佈局（例如頁眉、頁腳）。
    - `Error.cshtml`：錯誤頁面模板。
  5. wwwroot 資料夾
    作用：存放靜態資源（如 CSS、JavaScript 和圖片）。
    預設內容：
```
wwwroot/
  css/
  js/
```

## 3. 運行專案  
在終端中運行以下指令：  

```bash
dotnet run
```

打開瀏覽器，訪問 http://localhost:5000。
預設會顯示 Home/Index 視圖內容。

## 4. 調試專案  
在 VS Code 中設定調試：  
點擊左側的「運行與調試」圖示，然後點擊「建立 a launch.json 檔案」。  
選擇 .NET Core，生成以下配置：  

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": ".NET Core Launch (web)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": "${workspaceFolder}/bin/Debug/net7.0/HelloWorldMvc.dll",
            "args": [],
            "cwd": "${workspaceFolder}",
            "stopAtEntry": false,
            "serverReadyAction": {
                "action": "openExternally",
                "pattern": "\\bNow listening on:\\s+(https?://\\S+)"
            },
            "env": {
                "ASPNETCORE_ENVIRONMENT": "Development"
            },
            "sourceFileMap": {
                "/Views": "${workspaceFolder}/Views"
            }
        }
    ]
}
```
啟動調試： 
  1. 點擊「F5」開始調試。  
  2. 你可以在控制器或視圖中設置斷點，檢查請求和響應的執行情況。  
## 5. 修改並測試 Hello World  

修改 HomeController 的 Index 方法：  

```csharp
public IActionResult Index()
{
    ViewData["Message"] = "Hello World from ASP.NET Core MVC!";
    return View();
}
```

修改 `Views/Home/Index.cshtml`：
```html
<h1>@ViewData["Message"]</h1>
```
運行或調試專案，訪問 http://localhost:5000，應顯示：
```csharp
Hello World from ASP.NET Core MVC!
```
## 總結
檔案作用：每個檔案在 ASP.NET Core MVC 的運行中都有其特定功能，如程式入口點、控制器、視圖、靜態資源等。
運行專案：通過 dotnet run 或 VS Code 調試功能運行。
調試專案：設置斷點，分析請求和執行流程。