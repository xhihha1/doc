
## abp cli  


[ABP CLI](https://abp.io/docs/latest/cli)

### Install

```bash
dotnet tool install -g Volo.Abp.Studio.Cli

dotnet tool update -g Volo.Abp.Studio.Cli
```

## pwsh PowerShell 安裝

[在 Windows 上安裝 PowerShell](https://learn.microsoft.com/zh-tw/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5)

```shell
winget search Microsoft.PowerShell
```

```shell
Name               Id                           Version Source
---------------------------------------------------------------
PowerShell         Microsoft.PowerShell         7.5.1.0 winget
PowerShell Preview Microsoft.PowerShell.Preview 7.6.0.4 winget
```

```shell
winget install --id Microsoft.PowerShell --source winget
```

```shell
winget install --id Microsoft.PowerShell.Preview --source winget
```

```shell
winget list Microsoft.PowerShell
```
檢查 PowerShell 安裝路徑，一般會在：

```makefile
C:\Program Files\PowerShell\<版本號>\pwsh.exe
```

```bash
pwsh --version
```

## Create a new project

```bash
abp new AbpDemoApp -t app -u mvc --database-provider ef 
```

