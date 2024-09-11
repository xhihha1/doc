# 因為這個系統上已停用指令碼執行，所以無法載入  

```
yarn : 因為這個系統上已停用指令碼執行，所以無法載入 C:\Program Files\nodejs\yarn.ps1 檔案。如需詳細資訊，請參閱 about_Execution_Policies，網址為 https:/go.microsoft.com/fwlink/?LinkID=135170。
位於 線路:1 字元:1
+ yarn install --pure-lockfile
+ ~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

1. 打开 PowerShell 以管理员身份运行  
2. 检查当前执行策略  
```
Get-ExecutionPolicy
```
3. 临时更改执行策略  
```
Set-ExecutionPolicy RemoteSigned -Scope Process
```
4. 永久更改执行策略  
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
5. 再次运行 yarn 命令  
```
yarn install --pure-lockfile  
```
- 注意事项  
请注意，调整执行策略可能会降低系统的安全性，因此在不再需要时，您可以将执行策略设置回 Restricted 或其他更严格的策略：
```
Set-ExecutionPolicy Restricted -Scope CurrentUser  
```