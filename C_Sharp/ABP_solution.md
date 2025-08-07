# Cli 建立專案

[CLI](https://abp.io/docs/latest/cli)  

```bash
abp new AbpSolution1 -dbms PostgreSQL -m none --theme leptonx-lite -csf
```

**-m none** 表示不產生 UI  

```bash
abp new ProductManagement -t app --dbms PostgreSQL --connection-string "Host=localhost;Port=5432;Database=ProductManagement;Username=postgres;Password=postgres" -csf
```

# 修改 appsettings.json 相關的連線訊息  

`AbpSolution1.web` 專案的 `appsettings.json` 檔案，修改資料庫連線字串：

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=AbpSolution1;User ID=postgres;Password=postgres;"
  }
}
```

`AbpSolution1.DbMigrations` 專案的 `appsettings.json` 檔案，修改資料庫連線字串：

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=AbpSolution1;User ID=postgres;Password=postgres;"
  }
}
```


建立資料庫 (Migration)
進入 EntityFrameworkCore.DbMigrations 專案資料夾，然後執行 migration 並更新資料庫：

```bash
cd src/AbpSolution1.EntityFrameworkCore
# 執行資料庫建立指令
dotnet ef database update
```

```bash
src\AbpSolution1.EntityFrameworkCore> dotnet ef database update
Build started...
Build succeeded.
Failed executing DbCommand (12ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT "MigrationId", "ProductVersion"
FROM "__EFMigrationsHistory"
ORDER BY "MigrationId";
Acquiring an exclusive lock for migration application. See https://aka.ms/efcore-docs-migrations-lock for more information if this takes too long.
Applying migration '20250520024259_Initial'.
Done.
```
顯示   
```bash
Applying migration '20250520024259_Initial'.
Done.
```  

以上執行後可以在 PostgreSQL 中看到 `AbpSolution1` 資料庫已經建立完成。  

# 執行網站  

進入 `AbpSolution1.Web` 專案資料夾，然後執行網站：

```bash
cd ../AbpSolution1.Web
dotnet run
```  

```bash
abp install-libs
```

執行後會顯示下面的資訊  
```bash  
[11:19:06 INF] Initialized all ABP modules.
[11:19:06 INF] Initializing UI Database
[11:19:07 INF] Saving healthchecks configuration to database
[11:19:07 INF] Now listening on: http://0.0.0.0:44373
[11:19:07 DBG] Executing HealthCheck collector HostedService.
[11:19:07 INF] Start processing HTTP request GET http://0.0.0.0:44373/health-status
[11:19:07 INF] Sending HTTP request GET http://0.0.0.0:44373/health-status
[11:19:07 INF] Application started. Press Ctrl+C to shut down.
[11:19:07 INF] Hosting environment: Development
[11:19:07 INF] Content root path: D:\EBO\ABP\AbpSolution1\AbpSolution1\src\AbpSolution1.Web
[11:19:07 INF] Request starting HTTP/1.1 GET http://0.0.0.0:44373/health-status - null null
```  

然後在瀏覽器中輸入 `http://0.0.0.0:44373/`，即可看到 ABP 的歡迎頁面。



# 照 ABP Clean Architecture 的正統流程，建立 Book 模組。  

1. 第 1 步：建立 Book Entity（於 Domain 層）

**src/AbpSolution1.Domain/Books/Book.cs**

```csharp
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace AbpSolution1.Books
{ 
  public class Book : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public int Price { get; set; }
        public bool IsPublished { get; set; }

        public Book() {}

        public Book(Guid id, string name, int price, bool isPublished)
            : base(id)
        {
            Name = name;
            Price = price;
            IsPublished = isPublished;
        }
    }
}
```

2. 第 2 步：建立 DTO 與 Service Interface（在 Application.Contracts） 
**DTO** 是 Data Transfer Object 的縮寫，主要用來傳遞資料的物件。  

**src/AbpSolution1.Application.Contracts/Books/BookDto.cs**  

```csharp
using System;
using Volo.Abp.Application.Dtos;

namespace AbpSolution1.Books
{
    public class BookDto : AuditedEntityDto<Guid>
    {
        public string? Name { get; set; }
        public int Price { get; set; }
        public bool IsPublished { get; set; }
    }
}
```

**src/AbpSolution1.Application.Contracts/Books/CreateUpdateBookDto.cs**  

```csharp
using System.ComponentModel.DataAnnotations;

namespace AbpSolution1.Books
{
    public class CreateUpdateBookDto
    {
        [Required]
        [StringLength(128)]
        public string? Name { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Price must be non-negative")]
        public int Price { get; set; }

        public bool IsPublished { get; set; }
    }
}
```

**IBookAppService.cs**  
```csharp
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace AbpSolution1.Books
{
    public interface IBookAppService : 
        ICrudAppService< // 自動提供 CRUD 方法
            BookDto, // 查詢時用的 DTO
            Guid, // 主鍵類型
            PagedAndSortedResultRequestDto, // 分頁排序查詢條件
            CreateUpdateBookDto, // 建立用的 DTO
            CreateUpdateBookDto> // 更新用的 DTO（這邊一樣）
    {
    }
}
```

3. 第 3 步：建立 BookAppService 實作

在  Application 專案下的 `csproj` 加入  

```xml
<ItemGroup>
    <ProjectReference Include="..\AbpSolution1.Domain\AbpSolution1.Domain.csproj" />
    <ProjectReference Include="..\AbpSolution1.Application.Contracts\AbpSolution1.Application.Contracts.csproj" />
  </ItemGroup>
```

**src/AbpSolution1.Application/Books/BookAppService.cs**  


```csharp
using System;
using AbpSolution1.Books;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Application.Services;

namespace AbpSolution1.Books
{
    public class BookAppService : CrudAppService<
        Book, // 實體
        BookDto, // 回傳用 DTO
        Guid, // 主鍵
        PagedAndSortedResultRequestDto, // 查詢條件
        CreateUpdateBookDto, // 建立用 DTO
        CreateUpdateBookDto>, // 更新用 DTO
        IBookAppService // 介面
    {
        public BookAppService(IRepository<Book, Guid> repository)
            : base(repository)
        {
        }
    }
}

```

ABP 提供的 CrudAppService：  
自動實作常見 CRUD：GetAsync, CreateAsync, UpdateAsync, DeleteAsync, GetListAsync
輕鬆呼叫 Repository<Book> 存取資料庫


對 CreateUpdateBookDto ➝ Book 建立對應的 mapping 設定，因此在  
**BookApplicationAutoMapperProfile.cs**  
```csharp
using AutoMapper;

namespace AbpSolution1.Books
{
    public class BookApplicationAutoMapperProfile : Profile
    {
        public BookApplicationAutoMapperProfile()
        {
            // DTO to Entity
            CreateMap<CreateUpdateBookDto, Book>();

            // Entity to DTO (如果你有 GetBookDto 類別，也可以加這個)
            CreateMap<Book, BookDto>();
        }
    }
}
```

4. 第 4 步：在 DbContext 中註冊 Book Entity

修改  
**src/AbpSolution1.EntityFrameworkCore/EntityFrameworkCore/AbpSolution1DbContext.cs**  
讓 EF Core 能正確地建立對應的 Books 資料表  

添加 class
```csharp
using AbpSolution1.Books;
```

在 DbContext 中註冊 Book Entity
```csharp
public DbSet<Book> Books { get; set; }
```

在 OnModelCreating 方法中註冊 Book Entity  
```csharp  
builder.Entity<Book>(b =>
{
    b.ToTable("Books");
    b.ConfigureByConvention();
    b.Property(x => x.Name).IsRequired().HasMaxLength(128);
});
```


5. 第 5 步：產生 Migration 並更新資料庫

**src/AbpSolution1.EntityFrameworkCore/**

```bash
# 產生 Migration
dotnet ef migrations add Added_Book_Entity  
# migrations add：表示要新增一個「遷移」，也就是一組資料庫變更紀錄。  
# dotnet ef migrations add <MigrationName> [options]  
# 更新資料庫
dotnet ef database update
```

EF Core 會根據目前的 DbContext 和其相關的 Entity 類別（例如你新增了一個 Book 類別並加進 DbContext）：  
1. 比對上一次的遷移與目前的模型差異。  
2. 自動產生一個遷移檔案（例如 20250520012345_Added_Book_Entity.cs）放在你的 Migrations 資料夾。  
3. 此檔案會包含：  
  - Up() 方法：定義要「如何變更資料庫結構」（例如新增資料表、欄位）。  
  - Down() 方法：定義要「如何還原這次變更」。  

執行後可以在 PostgreSQL 中看到 `Books` 資料表已經建立完成。  

```sql
SELECT * FROM "Books";
```

6. 第 6 步：建立 BookAppService，並透過 Swagger 測試 API  

各層責任對照說明（ABP Clean Architecture）
| 專案 |	責任 |	應放檔案 |
| --- | --- | --- |
| *.Domain |	Entity、Aggregate、Repository 介面 |	Book.cs |
| *.Application.Contracts |	DTO / Application Service Interface	BookDto.cs、CreateUpdateBookDto.cs、IBookAppService.cs |
| *.Application |	Application Service 實作 |	BookAppService.cs |
| *.EntityFrameworkCore |	EF Core 的資料庫實作（DbContext、Entity Mapping）|	BookConfiguration.cs |
| *.Web |	Web API 啟動、Swagger |	無需放業務邏輯檔案 |


## Swagger Integration
在 `AbpSolution1.Web` 專案中，安裝 `Volo.Abp.Swashbuckle` 套件：

```bash
abp add-package Volo.Abp.Swashbuckle
```

```
dotnet run
```

在瀏覽器中輸入 `http://0.0.0.0:44373/swagger/index.html`，即可看到 Swagger UI。  


-------------
# 各 project 說明  

- **Domain**：業務邏輯層，包含實體、聚合根、領域服務等。
- **Application.Contracts**：應用程式服務的介面與 DTO，定義了應用程式的邊界與資料傳輸物件。
- **Application**：應用程式服務的實作，包含 CRUD 操作、商業邏輯等。
- **EntityFrameworkCore**：資料存取層，使用 Entity Framework Core 來操作資料庫。
- **HttpApi**：Web API 層，提供 RESTful API 介面。
- **HttpApi.Client**：用於與其他服務進行 API 呼叫的客戶端程式碼。
- **Web**：前端應用程式，通常是 ASP.NET Core MVC 或 Razor Pages 應用程式。
- **DbMigrator**：資料庫遷移工具，負責執行資料庫的遷移操作。
- **Domain.Shared**：共用的領域模型，通常包含一些共用的實體或值物件。

## 為什麼不需要改 HttpApi 就能讓 Swagger 自動產生 Book 的 CRUD API？  

### 關鍵在於 ABP 的自動 API 暴露機制（Auto API Controllers）：  
🧠 背後原理簡述：  
當你在 Application 專案中：  
- 建立一個繼承自 ApplicationService 的 class（例如 BookAppService） 
- 且這個 class 實作的是 Application.Contracts 中的介面（例如 IBookAppService）  
- 並且這個介面被標記為 [RemoteService] 或沒有禁用 remote service  
ABP 會：  
- 自動在背景為這個 AppService 生成一組 Http API 控制器（在執行時） 
- 這些 API 會自動顯示在 Swagger 上，並具有完整的路由、參數、回傳型別說明  

## 何時才需要加 HttpApi？
你只有在以下幾種情況才需要額外修改 HttpApi 專案：  
- 需要自訂 Controller 名稱、路由、動作名  
- 需要處理非標準 REST 行為（例如上傳檔案、特殊參數格式）  
- 想要手動控制權限（如使用 [Authorize]）而不透過 ABP 自動處理  
- 不想用 ApplicationService 的方式，想自行控制 Service 層與 API 分離  


## 模組間的依賴關係圖  

```txt
Domain.Shared
↑
Domain
↑
Application.Contracts   ←───→  HttpApi.Client
↑
Application
↑
HttpApi           →       Web
↑
DbMigrator → EntityFrameworkCore
```

## 專案結構與用途說明
### 1. AbpSolution1.Domain
- 用途：
  - 定義實體（Entities）、聚合根（Aggregate Roots）、倉儲介面（Repositories Interfaces）、Domain Service（如有）。  
  - 負責領域邏輯，是核心中的核心。  

- 加 Book 模組時應包含：  
  - Book entity 類別  
  - IBookRepository 介面  
  - 若有複雜業務規則，可放 Domain Services  

### 2. AbpSolution1.Domain.Shared
- 用途：
  - 定義可被其他層共用的常數（如 EntityType、PermissionName、FeatureName）、Enum、DTO Enum 對應值。
  - 定義共用的 BookConsts.cs、Enum BookType。
- 加 Book 模組時應包含：
  - BookType 列舉類型（如小說、技術書）  
  - 權限定義：BookPermissions  

### 3. AbpSolution1.Application.Contracts
- 用途：  
  - 定義 Application 層的 DTOs（資料傳輸物件）、介面（如 IBookAppService）。
  - 是 Application 與外部溝通的 API 介面（包含給前端用的）。
- 加 Book 模組時應包含：
  - BookDto、CreateUpdateBookDto
  - IBookAppService 介面

### 4. AbpSolution1.Application
- 用途：
  - 實作 Application.Contracts 定義的服務介面。
  - 處理應用邏輯（調用 domain、repository），不包含 UI，也不直接處理 HTTP。
- 加 Book 模組時應包含：
  - BookAppService：實作 IBookAppService
  - 注入 IBookRepository

### 5. AbpSolution1.EntityFrameworkCore
- 用途：
  - 使用 EF Core 的實作層，實作 Repository 介面與 DbContext。
  - 實體與資料表的配置 (BookConfiguration)。
- 加 Book 模組時應包含：
  - 在 DbContext 中加入 DbSet`<Book>`
  - 實作 IBookRepository
  - EntityTypeConfiguration`<Book>`

### 6. AbpSolution1.HttpApi
- 用途：
  - 將 Application 層的服務（AppService）自動暴露成 HTTP API。
  - 通常不需手動撰寫 Controller，ABP 使用自動生成。
- 加 Book 模組時應包含：
  - 通常只需在 BookAppService 註明 [RemoteService(true)] 即會自動產生
  - 若需自訂 API，可額外寫 BookController，繼承 AbpController

### 7. AbpSolution1.HttpApi.Client
- 用途：
  - 提供 供其他微服務或前端 Blazor、Console App 調用的 API client proxy。
  - 適用於跨模組或跨服務調用。
- 加 Book 模組時應包含：
  - 通常會由自動產生工具根據 Application.Contracts 自動生成 Client 代理，不需手動編寫

### 8. AbpSolution1.Web
- 用途：
  - 提供使用者介面（Web UI），使用 MVC + Razor 或前端框架如 Angular。
  - 注入 UI 元件、權限管理、導航、模組頁面。
- 加 Book 模組時應包含：
  - 建立 Pages/Books Razor Pages 或 Vue/Angular 對應元件
  - 定義 NavigationMenu（加入左側選單）
  - 權限驗證、UI 顯示轉換（i18n）

### 9. AbpSolution1.DbMigrator
- 用途：
  - 資料庫 Migration 工具，執行 Migrate、Seed 程式碼。
  - 通常部署或開發初始化 DB 使用。
- 加 Book 模組時應包含：
  - 在 DbMigrator 中呼叫 BookDataSeeder.SeedAsync() 插入範例資料