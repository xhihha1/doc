# Poetry 全面教學：Python 版本管理、虛擬環境管理、套件管理與基本應用  

Poetry 是目前最受歡迎的 Python 套件管理工具之一。  


## 1. Poetry 安裝  

### (1) 安裝 Poetry   
Poetry 提供官方安裝指令：

```sh
curl -sSL https://install.python-poetry.org | python3 -
```
或
```sh
brew install poetry
```


安裝完成後，請確保 poetry 已加入 PATH：

```sh
poetry --version  # 確認是否安裝成功
```
如果你使用 Windows，可使用：

```powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

### (2) 設定 Poetry 讓它不使用全域環境  
```sh
poetry config virtualenvs.in-project true
```
這樣 Poetry 會在專案目錄下建立 .venv 目錄，而不使用全域的 Python 環境。

##　2. 建立與管理 Python 專案  

### (1) 建立新專案
```sh
poetry new my_project
cd my_project
```
這會產生以下結構：

```bash
my_project/
│── pyproject.toml  # Poetry 設定檔
│── README.rst       # 預設 README
│── my_project/      # Python 程式碼目錄
│   ├── __init__.py
│── tests/           # 測試目錄
│   ├── __init__.py
```

### (2) 在現有專案中初始化 Poetry
如果你已有一個 Python 專案，並想使用 Poetry：

```sh
cd existing_project
poetry init
```
Poetry 會詢問你的專案資訊，並生成 pyproject.toml。

## 3. Python 版本管理  
Poetry 可指定 Python 版本，確保專案環境一致。

### (1) 設定 Python 版本
```sh
poetry env use python3.10  # 指定 Python 版本
```
或直接在 pyproject.toml 指定：

```toml
[tool.poetry.dependencies]
python = "^3.10"
```
這代表支援 3.10.x 及以上但不超過 4.0。

### (2) 切換 Python 版本

如果你安裝了多個 Python 版本，可使用：

```sh
poetry env use /path/to/python  # 指定 Python 版本
```
或：

```sh
pyenv global 3.9.6  # 如果你使用 pyenv 來管理 Python 版本
poetry env use python
```

## 4. 虛擬環境管理  

### (1) 建立虛擬環境
當你進入專案時，執行：

```sh
poetry install
```
Poetry 會自動建立 .venv/ 目錄並安裝所有依賴。

### (2) 啟動虛擬環境

```sh
eval $(poetry env activate)  
```

```sh
poetry shell  # 進入虛擬環境
# Looking for poetry shell? It was moved to a plugin: poetry-plugin-shell
```
或：

```sh
poetry run python  # 在虛擬環境中執行 Python
```
### (3) 移除虛擬環境
如果你想刪除當前虛擬環境：

```sh
poetry env remove python
```

### (4) 列出所有虛擬環境

```sh
poetry env list
```

## 5. 套件管理  
Poetry 的套件管理比 pip 更方便，因為它會自動更新 pyproject.toml 和 poetry.lock。

### (1) 安裝套件

```sh
poetry add requests  # 安裝 requests 套件
```
這會更新 pyproject.toml：

```toml
[tool.poetry.dependencies]
requests = "^2.26.0"
```

並鎖定到 poetry.lock，確保所有人安裝時版本一致。

(安裝指定版本)

```sh
poetry add requests@2.25.1
```
(安裝開發環境依賴)

```sh
poetry add black --dev  # 只在開發環境使用
```

### (2) 移除套件
```sh
poetry remove requests
```

### (3) 列出已安裝套件
```sh
poetry show
```

### (4) 更新所有套件
```sh
poetry update
```

這會根據 pyproject.toml 重新解析依賴，並更新 poetry.lock。

## 6. 執行專案  

### (1) 執行 Python 腳本

```sh
poetry run python my_project/main.py
```
或：

```sh
poetry shell  # 進入虛擬環境
python my_project/main.py
```

### (2) 執行 CLI 命令

```sh
poetry run my_script
```
## 7. 鎖定與部署

### (1) 生成 requirements.txt
如果你需要在非 Poetry 環境部署：

```sh
poetry export -f requirements.txt --output requirements.txt
```
然後可用 pip 安裝：

```sh
pip install -r requirements.txt
```

### (2) 部署時安裝所有依賴

```sh
poetry install --no-dev  # 只安裝正式環境依賴
```
## 8. 發佈 Python 套件
如果你想發佈自己的 Python 套件：

### (1) 設定 pyproject.toml
確保 pyproject.toml 包含：

```toml
[tool.poetry]
name = "my_package"
version = "0.1.0"
description = "My awesome package"
authors = ["Ken <ken@example.com>"]

[tool.poetry.dependencies]
python = "^3.9"

[tool.poetry.dev-dependencies]
pytest = "^7.0"
```

(2) 建立套件

```sh
poetry build
```
這會產生：

```pgsql
dist/
│── my_package-0.1.0-py3-none-any.whl
│── my_package-0.1.0.tar.gz
```

### (3) 發佈到 PyPI

```sh
poetry publish --username myusername --password mypassword
```

如果你使用 Test PyPI（測試版倉庫）：

```sh
poetry publish --repository testpypi
```

推薦組合：  
- pyenv + poetry → 管理 Python 版本 + 現代套件管理  
- poetry → 自動管理虛擬環境，不需要 virtualenv or venv  
- poetry.lock → 確保團隊成員的環境一致 🎯  