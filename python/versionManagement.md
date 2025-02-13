

| 工具 |	主要用途 |	是否管理 Python 版本 |	是否管理虛擬環境 |	適用場景 |
|  -------------  | ----                        | ------------  | ----  | ----  |
|virtualenv       |	虛擬環境管理                 |	❌ 否        |	✅ 是                           |	傳統 Python 環境管理，適合簡單的隔離專案依賴|
|pyenv            |	Python 版本管理              |	✅ 是       |	❌ 否（需搭配 pyenv-virtualenv） |	多 Python 版本切換，如 2.x、3.x、pypy|
|pyenv-virtualenv |	Python 版本 + 虛擬環境管理    |	✅ 是        |	✅ 是                            |	pyenv 的擴充，提供 virtualenv 功能|
|venv（內建）      |	標準虛擬環境管理           | ❌ 否        |	✅ 是                            |	Python 內建，適合輕量級應用|
|poetry           |	依賴 + 虛擬環境管理           |	✅ 是（間接） |	✅ 是                            |	現代 Python 開發，推薦用於新專案|






https://www.jianshu.com/p/f482a9fcae0e

windows pyenv  
https://pypi.org/project/pyenv-win/


Python 版本管理與虛擬環境 ( macOS )  
https://learningsky.io/python-development-on-macos-with-pyenv-virtualenv/  

Python 版本管理與虛擬環境 ( Ubuntu )  
https://learningsky.io/python-development-on-ubuntu-with-pyenv-virtualenv/  


查看列表  

    pyenv install -l  

安裝  

    pyenv install 3.6.3  

設定使用  

    pyenv global 3.6.3  

pyenv-win commands  

    commands     List all available pyenv commands
    local        Set or show the local application-specific Python version
    global       Set or show the global Python version
    shell        Set or show the shell-specific Python version
    install      Install 1 or more versions of Python 
    uninstall    Uninstall 1 or more versions of Python
    update       Update the cached version DB
    rehash       Rehash pyenv shims (run this after switching Python versions)
    vname        Show the current Python version
    version      Show the current Python version and its origin
    versions     List all Python versions available to pyenv
    exec         Runs an executable by first preparing PATH so that the selected Python
    which        Display the full path to an executable
    whence       List all Python versions that contain the given executable


虛擬環境工具pyenv的安裝，配置和使用，完美控制python版本  

https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/700508/