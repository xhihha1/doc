
# pyenv-win 安裝步驟   

### 解決 Windows 上輸入指令出現「因為這個系統上已停用指令碼執行，所以無法載入...」的問題  

    Get-ExecutionPolicy

    Set-ExecutionPolicy RemoteSigned


## 使用 pip 安裝 pyenv  

可以使用 PowerShell：  

    pip install pyenv-win --target $HOME\\.pyenv

或者 cmd：  

    pip install pyenv-win --target %USERPROFILE%\.pyenv

## 設定環境變數  

使用 PowerShell 來設定環境變數：  

    [System.Environment]::SetEnvironmentVariable('PYENV',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
    [System.Environment]::SetEnvironmentVariable('PYENV_HOME',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
    [System.Environment]::SetEnvironmentVariable('path', $env:USERPROFILE + "\.pyenv\pyenv-win\bin;" + $env:USERPROFILE + "\.pyenv\pyenv-win\shims;" + [System.Environment]::GetEnvironmentVariable('path', "User"),"User")

## 驗證安裝成功  

    pyenv --version
    # pyenv 2.64.9 

## pyenv 相關指令  

    #Some useful pyenv commands are:
    #   commands     List all available pyenv commands
    #   duplicate    Creates a duplicate python environment
    #   local        Set or show the local application-specific Python version
    #   global       Set or show the global Python version
    #   shell        Set or show the shell-specific Python version
    #   install      Install a Python version using python-build
    #   uninstall    Uninstall a specific Python version
    #   update       Update the cached version DB
    #   rehash       Rehash pyenv shims (run this after installing executables)
    #   vname        Show the current Python version
    #   version      Show the current Python version and its origin
    #   version-name Show the current Python version
    #   versions     List all Python versions available to pyenv
    #   exec         Runs an executable by first preparing PATH so that the selected Python
    #   which        Display the full path to an executable
    #   whence       List all Python versions that contain the given executable

## 檢視所有可選用的 python 版本  

    pyenv versions

## install -l | 檢視可以安裝版本的 python

    pyenv install -l

## 安裝特定版本的 python  

    pyenv install 3.10.0b3

## 切換 Python 版本  

    $ pyenv global 3.7.7
    $ pyenv local 3.7.7
    $ pyenv shell 3.7.7

global & local & shell 三者使用方法差異在於：  

- global 對應於全局  
- local 對應於當前資料夾  
- shell 對應於當前 shell  
- 優先順序是 shell > local > global  

## Pyenv 如何切換成原始系統的版本？  

    pyenv global system

## 更新 python 環境資訊  

    pyenv rehash

## Pyenv 切換 python 版本成功後，如何查看？  

    python3 –version   

## pip (python3 -m pip)  

    python3 -m pip --version  
    python3 -m pip install requests  


# pyenv exec 執行環境下的 python, pip  

first look at shims. this shows where pyenv is linking the packages to.

    pyenv shims

pyenv will try to be smart and install them in the packages defined for the version you installed i.e. ./.local/lib/python3.10/site-packages in the case for 3.10.x

so you can either first set a good global version

    pyenv install --list  # show installable versions
    pyenv install 3.9     # install 3.9.x latest
    pyenv global 3.9      # set your global to use 3.9.x
    pyenv local 3.10      # set your current session to use 3.10.x
    pyenv local           # check which version you are using
    python --version      # to reconfirm


there are a few ways to install packages.. just be consistent. its already good that you are using pyenv

## use pyenv to execute the current python which calls pip for this version

    pyenv exec python -m pip --version
    pyenv exec python -m pip install ansible

## (not recommended) example ansible guide way to install it under user directory which will mess things up, by trying to do additional symlinks and rely on paths. a good example is ansible with warnings.

    pip install ansible --user

## (recommended) normal python invoked pip (to install ansible); note you need to install ansible everytime you switch to another version other than 3.10. you might want to install it globally.

    pyenv local 3.10
    python -m pip install ansible