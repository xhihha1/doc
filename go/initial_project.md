
### 设置编译环境:

    ```sh
     # set GOOS=linux  // 編譯 Linux 執行
     # set GOOS=windows // 編譯 windows 執行
    ```


# 環境建置  

顯示 GO 環境變量  

    go env  

### 建立目錄：

依照 go 結構建立目錄

`<GOPATH>/src/firstProj`

### go module 模組管理  

進入到`firstProj`目錄下，執行  

    go mod init

生成 `go.mod`  

    module firstProj

    go 1.15

### 設定 GOPATH 在 src 的上一層目錄：

 - windows

```
  set GOPATH=%CD%
```

 - Linux

```
  export GOPATH=[Your GOPATH]
```

備註： 在vscode 上執行 `set GOPATH` 要注意 terminal要使用 cmd 不能使用 powershell.

### 建立 main.go  

    package main

    import "fmt"

    func main(){
        fmt.Println("test")
    }

### run 

    go run main.go  

### build  

在專案目錄生成 `exe`  

    go build main.go

### install 生成 exe  

在專案目錄下執行  

    go install firstProj  

在 GOPATH 下 `bin` 目錄中生成 `exe`  

## import 套件  

直接 import套件  

    package main

    import (
        "fmt"
        "rsc.io/quote"
    )

    func main(){
        fmt.Println("test")
        fmt.Println(quote.Go())
    }

執行 `run` 會自動下載套件到 GOPATH 下 `pkg` 目錄下  

自動生成 `go.sum` 在專案目錄  

    golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c h1:qgOY6WgZOaTkIIMiVjBQcw93ERBE4m30iBm00nkL0i8=
    golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c/go.mod h1:NqM8EUOU14njkJ3fqMW+pc6Ldnwhi/IjpwHt7yyuwOQ=
    rsc.io/quote v1.5.2 h1:w5fcysjrx7yqtD/aO+QwRjYZOKnaM9Uh2b40tElTs3Y=
    rsc.io/quote v1.5.2/go.mod h1:LzX7hefJvL54yjefDEDHNONDjII0t9xZLPXsUe+TKr0=
    rsc.io/sampler v1.3.0 h1:7uVkIFmeBqHfdjD+gZwtXXI+RODJ2Wc4O7MPEh/QiW4=
    rsc.io/sampler v1.3.0/go.mod h1:T1hPZKmBbMNahiBKFy5HrXp6adAjACjK9JXDnKaTXpA=

`go.mod` 檔案自動修改  

    module firstProj

    go 1.15

    require rsc.io/quote v1.5.2


### 使用 vendor 目錄進行套件管理  

    go mod vendor  

使用 vendor時，會下載檔案到 `pkg`，並且將套件複製一份到 `vendor` 目錄下  
