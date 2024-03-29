1. 安裝 SQL Server Management Studio  
2. 安裝 SQL server Express  

如果連線是 `Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;`  
伺服器名稱就是`localhost\SQLEXPRESS`  

# 添加帳號  

1. 使用 SQL Server Management Studio (SSMS) 以系統管理員身分登入到 SQL Server。  
2. 在 SSMS 的「物件總管」中，展開「安全性」資料夾，找到「登入」資料夾。  
3. 在「登入」資料夾上按滑鼠右鍵，選擇「新登入」。  
4. 在「新登入」對話方塊中，輸入要添加的 SQL Server 登入名稱。  
5. 在「選擇頁面」中，選擇「一般」。  
6. 在「登入名稱」下方，選擇「SQL Server 身分驗證」。  
7. 輸入密碼和確認密碼，設定您所需的登入密碼。  
8. 在左側選單中，選擇「用戶對應」。  
9. 在「用戶對應」區域中，選擇您希望該登入能夠連接的資料庫。  
10. 在「用戶對應」區域的下方，選擇要分配給該使用者的角色或授予特定的權限。  
11. 按下「確定」按鈕以完成登入的添加和權限的設定。  

# 帳號密碼登入  

預設都是 ***Windows 身分驗證*** 的登入方式，要使用帳號密碼登入

檢查 SQL Server 設定：確保 SQL Server 已經設定為允許使用 SQL Server 驗證。您可以透過以下步驟檢查設定：  
在 SQL Server Management Studio 中連線到 SQL Server。  
在「物件總管」中，右鍵點擊伺服器，選擇「屬性」。  
在屬性視窗的左側選單中，選擇「安全性」。  
確認「伺服器驗證」選項下的 ***「SQL Server 和 Windows 驗證模式」*** 是否已選取。如果未選取，選取該選項並按下「確定」以儲存變更。  

# 如何讓sql server可以透過tcp/ip 進行連線  

要讓 SQL Server 可以透過 TCP/IP 進行連線，您可以按照以下步驟進行設定：

1. 開啟「SQL Server 配置管理員」：

在 Windows 工作列的搜尋欄位中，輸入「SQL Server 配置管理員」。
選擇搜尋結果中的「SQL Server 配置管理員」應用程式。

2. 設定網路協定：

在 SQL Server 配置管理員中，展開「SQL Server 網路組態」。
選擇「協定」資料夾。
在右側窗格中，確保「TCP/IP」協定是已啟用的（若未啟用，可按滑鼠右鍵選擇啟用）。

3. 設定 TCP/IP 屬性：

在 SQL Server 配置管理員中，展開「SQL Server 網路組態」。
點擊「協定」資料夾，然後雙擊「TCP/IP」協定以開啟其屬性視窗。
在「TCP/IP 屬性」視窗中，切換到「IP 位址」頁籤。
在「IP1」至「IPAll」範圍中，檢查是否已設定正確的 IP 位址和埠號。
預設情況下，「TCP 動態連接埠」欄位應該為 ***空白*** 。如果您想要指定固定的埠號，請在「TCP 連接埠」欄位中輸入該埠號。
按下「確定」以儲存變更。

4. 重新啟動 SQL Server 服務：

在 SQL Server 配置管理員中，展開「SQL Server 服務」。
在右側窗格中，找到相應的 SQL Server 服務，例如「SQL Server (MSSQLSERVER)」。
按滑鼠右鍵選擇該服務，然後選擇「重新啟動」。

# SSMS 使用 ip + port  

例如： ***192.168.0.100,1433***，其中 192.168.0.100 是 SQL Server 的 IP 位址，1433 是 SQL Server 的埠號。  

# SSMS 如何連接SQL server express 建立資料庫

建立新的資料庫：

在 SSMS 的物件總管窗格中，展開 "資料庫" 資料夾。  
按滑鼠右鍵點擊 "資料庫" 資料夾，選擇 "新建立資料庫"。  
在 "新建立資料庫" 對話方塊中，輸入新資料庫的名稱。  
按下 "確定" 按鈕以建立資料庫。  

# 新建立資料庫之後該如何新建資料表  

1. 在資料庫中建立資料表：

- 在 SSMS 的物件總管窗格中，展開目標資料庫。  
- 按滑鼠右鍵點擊 "資料表" 資料夾，選擇 "新建立資料表"。  

2. 設計資料表結構：  

- 在 "設計" 視窗中，您可以定義資料表的結構。  
- 在每一行中，輸入欄位名稱、資料型別、是否允許為 NULL、預設值等等。根據您的需求，設計適當的欄位。  

3. 儲存資料表：  

- 按下 "儲存" 圖示，或選擇 "檔案" 菜單中的 "儲存表格"。

4. 命名資料表：  

- 在 "儲存表格" 對話方塊中，輸入資料表的名稱。  
- 按下 "確定" 按鈕以建立資料表。  

可以使用 SSMS 的 "設計" 視窗來進一步調整資料表的結構，包括新增欄位、定義主鍵、設置索引等。此外，您還可以使用 T-SQL 語句或其他工具來建立資料表。  


    INSERT INTO Table_1 (name, time, value, CREATE_BY)
    VALUES ('John', CURRENT_TIMESTAMP, 3.14, 'User1')


# windows10 防火牆在哪設定  

1. 開啟「控制台」：

在 Windows 工作列的搜尋欄位中，輸入「控制台」。
選擇搜尋結果中的「控制台」應用程式。

2. 進入「系統和安全性」設定：

在控制台中，找到並點擊「系統和安全性」。

3. 開啟「Windows Defender 防火牆」設定：

在「系統和安全性」中，找到並點擊「Windows Defender 防火牆」。

4. 設定防火牆規則：

在 Windows Defender 防火牆視窗中，您可以看到現有的入站和出站規則。
點擊左側的「進階設定」。

5. 設定進階防火牆規則：

在進階安全性視窗中，您可以設定更詳細的進階防火牆規則。
點擊左側的「進階設定」。

6. 新增防火牆規則：

在進階安全性視窗中，您可以透過右側的「新增規則」來新增新的防火牆規則。
您可以根據需要選擇不同的規則類型，例如允許應用程式、連接埠或自訂規則。
跟隨嚮導步驟進行必要的設定。

## 開啟port  

1. 新增入站規則：

在進階安全性視窗中，點擊左側的「入站規則」。
在右側的動作面板中，選擇「新增規則」。

2. 配置新的入站規則：

在新增入站規則嚮導中，選擇規則類型（例如「連接埠」）並點擊「下一步」。
選擇「特定的本機連接埠」並輸入您想要開啟的埠號。
選擇「允許連接」並點擊「下一步」。

3. 設定規則範圍：

選擇適用的範圍（例如「所有網域」或「特定 IP 位址」）並點擊「下一步」。

4. 設定規則名稱和描述（選擇性）：

為規則提供名稱和描述，然後點擊「下一步」。

5. 完成規則設定：

檢閱您的設定，確保它們符合您的需求。
點擊「完成」以建立入站規則。