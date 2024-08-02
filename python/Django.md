# Django  

1. 安裝 Django  
```
pip install django
```
2. 創建 Django 項目  
```
django-admin startproject mysite
```
這將創建一個名為 mysite 的文件夾，內含 Django 項目所需的基本文件。  
```
mysit
  ├──mysite
  └ manage.py
```
3. 創建應用  
進入到剛才創建的項目目錄，並創建一個新的應用。例如，我們創建一個名為 myapp 的應用：
```
cd mysite
python manage.py startapp myapp
```
```
mysit
  ├──myapp
  ├──mysite
  └ manage.py
```
4. 配置應用  
打開 mysite/settings.py 文件，將 myapp 添加到 INSTALLED_APPS 列表中：  
```
INSTALLED_APPS = [
    ...
    'myapp',
]
```
5. 創建模型  
在 myapp/models.py 文件中定義一個簡單的模型。例如，我們創建一個名為 Post 的模型：  
```python  
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

    def __str__(self):
        return self.title
```
6. 創建數據庫遷移並應用  
```bash  
python manage.py makemigrations
python manage.py migrate
```
`myapp/models.py` 下會產生`migrations`目錄  
7. 設置管理界面  
在 myapp/admin.py 文件中註冊 Post 模型，以便在 Django 管理界面中管理：  
```python  
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```  
8. 創建視圖和模板  
在 myapp/views.py 中創建一個簡單的視圖來顯示所有的 Post：  
```python
from django.shortcuts import render
from .models import Post

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'myapp/post_list.html', {'posts': posts})

```
創建模板文件夾和模板文件。在 myapp 文件夾內創建一個名為 templates 的文件夾，再在其中創建 myapp 文件夾，並在其中創建 post_list.html 文件：  
```html
<!DOCTYPE html>
<html>
<head>
    <title>Post List</title>
</head>
<body>
    <h1>Post List</h1>
    <ul>
        {% for post in posts %}
            <li>{{ post.title }}</li>
        {% endfor %}
    </ul>
</body>
</html>
```
9. 設置 URL  
在 myapp/urls.py 中設置 URL 配置：  
```python  
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
]
```
將 myapp 的 URL 配置包含在主項目的 URL 配置中。在 mysite/urls.py 文件中添加：  
```python  
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
]
```
10. 啟動開發服務器  
運行 Django 開發服務器：  
```
python manage.py runserver
```
打開瀏覽器，訪問 http://127.0.0.1:8000/  

11. Note.
### 添加一筆 post  
- 登錄 Django 管理頁面  
- 訪問 Post 模型
- 添加一筆新記錄  

或是  
- 通過 Django Shell 添加記錄  
```bash  
python manage.py shell
```
- 在 Shell 中輸入以下命令來創建一筆新的 Post 記錄：  
```python  
from myapp.models import Post
# 創建一個新的 Post 記錄
post = Post(title='My First Post', content='This is the content of my first post.')
post.save()

# 查看所有的 Post 記錄
Post.objects.all()
```

### 修改端口 port  
在項目目錄中，運行 Django 開發服務器並指定新的端口號。例如，將端口號更改為 8080：  
```bash  
python manage.py runserver 8080
```
想指定 IP 地址和端口號，例如在 0.0.0.0（所有可用網絡接口）上的 8080 端口運行：  
```bash  
python manage.py runserver 0.0.0.0:8080
```

### 靜態文件（如 JavaScript、CSS 和圖片）需要放在應用的 static 目錄中  
1. 配置 static 目錄  
```
myapp/
    static/
        myapp/
            css/
                styles.css
            js/
                scripts.js
            images/
                logo.png
```
2. 配置 settings.py  
在項目的 settings.py 文件中，確保 STATIC_URL 和 STATICFILES_DIRS 設置正確：  
```python
# settings.py

STATIC_URL = '/static/'

# 如果你有額外的靜態文件夾，可以這樣配置
# STATICFILES_DIRS = [
#     BASE_DIR / "static",
# ]
```
3. 使用靜態文件模板標籤  
在你的模板文件中（例如 post_list.html），使用 {% load static %} 標籤來加載靜態文件，然後使用 {% static %} 標籤來引用這些文件：  
```html  
<!DOCTYPE html>
<html>
<head>
    <title>Post List</title>
    {% load static %}
    <link rel="stylesheet" type="text/css" href="{% static 'myapp/css/styles.css' %}">
    <script type="text/javascript" src="{% static 'myapp/js/scripts.js' %}"></script>
</head>
<body>
    <h1>Post List</h1>
    <img src="{% static 'myapp/images/logo.png' %}" alt="Logo">
    <ul>
        {% for post in posts %}
            <li>{{ post.title }}</li>
        {% endfor %}
    </ul>
</body>
</html>
```
4. 運行開發服務器  
```bash  
python manage.py runserver
```

# 搭配 vue或 react專案  
將前端項目和 Django 項目分開管理，並通過 API 進行交互。
## 目錄結構  
```
myproject/
    backend/
        manage.py
        mysite/
            __init__.py
            settings.py
            urls.py
            wsgi.py
        myapp/
            __init__.py
            admin.py
            apps.py
            models.py
            tests.py
            views.py
            urls.py
    frontend/
        node_modules/
        public/
        src/
        package.json
        ...
```
## Django 作為 API server  
在 backend/mysite/settings.py 中，確保 INSTALLED_APPS 包含你的應用：  
```python  
INSTALLED_APPS = [
    ...
    'myapp',
    'corsheaders',  # 如果需要跨域資源共享（CORS）
]

# 靜態文件配置
STATIC_URL = '/static/'

# 跨域資源共享（CORS）配置
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Vue 或 React 開發服務器地址
]
```  
在 backend/mysite/urls.py 中設置 URL 配置：  
```python  
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),  # 將 API 路由包含進來
]
```
在 backend/myapp/views.py 中創建一個簡單的 API 視圖：  
```python  
from django.http import JsonResponse

def post_list(request):
    data = {"posts": [{"id": 1, "title": "My First Post", "content": "Hello World!"}]}
    return JsonResponse(data)
```

# Django 使用 postgreSQL  
1. 安裝 PostgreSQL 和相關庫  
首先，確保你已經安裝了 PostgreSQL 數據庫和 psycopg2 庫：  
```bash  
pip install psycopg2-binary
```
2. 配置 Django 與 PostgreSQL 連接  
在 backend/mysite/settings.py 中配置數據庫設置：  
```python  
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'yourdbname',
        'USER': 'yourdbuser',
        'PASSWORD': 'yourdbpassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

```
3. 創建 Django 模型  
在 backend/myapp/models.py 中創建模型：  
```python  
# models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```
4. 遷移數據庫
```bash
python manage.py makemigrations
python manage.py migrate
```
5. 創建 API 視圖  
在 backend/myapp/views.py 中創建視圖來插入和讀取數據：  
```python  
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import Post
import json

@method_decorator(csrf_exempt, name='dispatch')
class PostView(View):
    def get(self, request):
        posts = Post.objects.all().values('id', 'title', 'content', 'created_at')
        return JsonResponse(list(posts), safe=False)

    def post(self, request):
        data = json.loads(request.body)
        post = Post.objects.create(title=data['title'], content=data['content'])
        return JsonResponse({'id': post.id, 'title': post.title, 'content': post.content, 'created_at': post.created_at})
```
6. 配置 URL  
在 backend/myapp/urls.py 中設置 API 路由：  
```python  
# urls.py
from django.urls import path
from .views import PostView

urlpatterns = [
    path('posts/', PostView.as_view(), name='post_list'),
]
```  
在 backend/mysite/urls.py 中包含應用的 URL：  
```python  
# urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),
]
```
7. 測試 API  
插入數據  
使用 curl 或 Postman 發送 POST 請求來插入數據：  
```bash  
curl -X POST http://127.0.0.1:8000/api/posts/ -H "Content-Type: application/json" -d '{"title": "My First Post", "content": "This is the content of my first post."}'
```
讀取數據  
使用 curl 或瀏覽器發送 GET 請求來讀取數據：  
```bash
curl http://127.0.0.1:8000/api/posts/
```

##  user, group資料  
```python
# models.py
from django.db import models

class Group(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class User(models.Model):
    username = models.CharField(max_length=200)
    groups = models.ManyToManyField(Group, related_name='users')

    def __str__(self):
        return self.username
```
创建和应用迁移  
```python  
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```
创建 API 视图  
```python  
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import User, Group
import json

@method_decorator(csrf_exempt, name='dispatch')
class UserView(View):
    def get(self, request):
        users = User.objects.all().values('id', 'username', 'groups__name')
        return JsonResponse(list(users), safe=False)

    def post(self, request):
        data = json.loads(request.body)
        groups = data.pop('groups', [])
        user = User.objects.create(**data)
        for group_name in groups:
            group, created = Group.objects.get_or_create(name=group_name)
            user.groups.add(group)
        return JsonResponse({'id': user.id, 'username': user.username, 'groups': [group.name for group in user.groups.all()]})

@method_decorator(csrf_exempt, name='dispatch')
class GroupView(View):
    def get(self, request):
        groups = Group.objects.all().values('id', 'name', 'users__username')
        return JsonResponse(list(groups), safe=False)

    def post(self, request):
        data = json.loads(request.body)
        group = Group.objects.create(**data)
        return JsonResponse({'id': group.id, 'name': group.name})
```
配置 URL  
```python  
# urls.py
from django.urls import path
from .views import UserView, GroupView

urlpatterns = [
    path('users/', UserView.as_view(), name='user_list'),
    path('groups/', GroupView.as_view(), name='group_list'),
]
```



# 與 Vue整合發布產品  
1. 將 Vue 應用打包成靜態文件，並由 Django 服務這些文件：  
    - 這種方法適合在部署時只使用一個服務器來處理所有的請求。你可以使用 Django 來服務靜態文件，這些文件是由 Vue 項目構建生成的。  
2. 分開部署 Django 後端和 Vue 前端：  
    - 這種方法適合在需要獨立擴展前端和後端的情況下。你可以使用 Nginx 或其他反向代理服務器來處理靜態文件，並將 API 請求代理到 Django 服務器。  

## 由Django服務  
1. 構建 Vue 應用  
```bash
npm run build

```
2. 將構建文件移動到 Django 的靜態文件目錄  
你可以將 frontend/dist 目錄中的文件移動到 Django 項目的靜態文件目錄中。  
將這些文件移動到 Django 項目的 static 目錄：  
```bash  
# 在 backend 目錄中創建 static 目錄
mkdir -p backend/static

# 將 Vue 應用的構建文件移動到 Django 的 static 目錄
cp -r frontend/dist/* backend/static/
```
3. 設置 Django 的模板和靜態文件配置  
保在 Django 的 settings.py 文件中正確配置靜態文件設置：  
```python  
# settings.py

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",
]
```
4. 修改 Django 視圖來渲染 Vue 應用  
在 Django 應用的視圖中渲染 Vue 的 index.html 文件。你可以創建一個簡單的視圖來渲染這個文件：  
```python  
# views.py
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
```
在 Django 的 urls.py 文件中設置路由：  
```python  
# urls.py
from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('api/', include('myapp.urls')),  # 保留 API 路由
]
```
5. 配置 Django 模板  
確保 Django 的 settings.py 文件中模板設置正確，包含構建後的 index.html 文件所在的目錄：  
```python  
# settings.py

TEMPLATES = [
    {
        ...
        'DIRS': [BASE_DIR / 'static'],
        ...
    },
]
```
6. 部署 Django 應用  
使用常用的部署方法來部署 Django 應用，例如使用 Gunicorn 和 Nginx：  
```bash
# 安裝 Gunicorn
pip install gunicorn

# 運行 Gunicorn 服務器
gunicorn mysite.wsgi:application
```
使用 Nginx 作為反向代理來服務靜態文件和 API 請求：  
```nginx  
server {
    listen 80;
    server_name yourdomain.com;

    location /static/ {
        alias /path/to/your/project/backend/static/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```



# Django Admin system  

需要使用超級用戶 (superuser) 賬號登入  
1. 創建超級用戶
```bash
python manage.py createsuperuser
```
2. 輸入超級用戶信息  
```bash
Username (leave blank to use 'yourusername'): admin
Email address: admin@example.com
Password:
Password (again):
Superuser created successfully.
```
3. 登入管理頁面  
**http://127.0.0.1:8000/admin**


#  Django 項目打包成 Docker 映像，可以創建一個 Dockerfile 和相關的配置文件。  

1. 創建 Dockerfile  
根目錄中創建一個名為 Dockerfile 的文件  
```dockerfile  
# 使用官方的 Python 基礎映像
FROM python:3.9-slim

# 設置環境變量，防止 Python 生成.pyc 文件
ENV PYTHONDONTWRITEBYTECODE 1

# 設置環境變量，強制 stdout 和 stderr 以未緩衝模式運行
ENV PYTHONUNBUFFERED 1

# 設置工作目錄
WORKDIR /code

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && apt-get clean

# 安裝 pipenv 和虛擬環境
RUN pip install --upgrade pip

# 複製依賴配置文件
COPY requirements.txt /code/

# 安裝 Python 依賴
RUN pip install -r requirements.txt

# 複製 Django 項目文件
COPY . /code/

# 生成靜態文件
RUN python manage.py collectstatic --noinput

# 執行命令以啟動服務器
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "mysite.wsgi:application"]
```
2. 創建 requirements.txt  
確保在你的 Django 項目根目錄中有一個 requirements.txt 文件，其中列出了所有的 Python 依賴項。這可以通過運行以下命令生成：  
```bash  
pip freeze > requirements.txt
```
3. 配置 Docker Compose (可選)  
如果你還需要 PostgreSQL 數據庫，可以使用 Docker Compose 來管理多個服務。創建一個 docker-compose.yml 文件，並添加以下內容：  
```yaml
version: '3'

services:
  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: yourdbname
      POSTGRES_USER: yourdbuser
      POSTGRES_PASSWORD: yourdbpassword

  web:
    build: .
    command: gunicorn mysite.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://yourdbuser:yourdbpassword@db:5432/yourdbname

volumes:
  postgres_data:
```
4. 更新 Django 設置  
確保在 backend/mysite/settings.py 中更新數據庫設置以使用環境變量：  
```python  
import os
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
}

# 靜態文件配置
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```
5. 構建和運行 Docker 容器   
運行以下命令來構建 Docker 映像並啟動容器：
```bash  
docker-compose up --build
```
Django 項目將會在 Docker 容器中運行，並且可以通過 http://localhost:8000 訪問。  
6. 進行數據庫遷移  
首次運行時，你需要在容器中運行數據庫遷移命令。打開一個新終端並運行以下命令：  
```bash  
docker-compose exec web python manage.py migrate
```

# 自動應用遷移  

1. 更新 Dockerfile  

```dockerfile  
# Dockerfile

# 使用官方的 Python 基礎映像
FROM python:3.9-slim

# 設置環境變量，防止 Python 生成.pyc 文件
ENV PYTHONDONTWRITEBYTECODE 1

# 設置環境變量，強制 stdout 和 stderr 以未緩衝模式運行
ENV PYTHONUNBUFFERED 1

# 設置工作目錄
WORKDIR /code

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && apt-get clean

# 安裝 pipenv 和虛擬環境
RUN pip install --upgrade pip

# 複製依賴配置文件
COPY requirements.txt /code/

# 安裝 Python 依賴
RUN pip install -r requirements.txt

# 複製 Django 項目文件
COPY . /code/

# 生成靜態文件
RUN python manage.py collectstatic --noinput

# 執行命令以啟動服務器
CMD ["sh", "-c", "python manage.py migrate && gunicorn --bind 0.0.0.0:8000 mysite.wsgi:application"]
```
Docker Compose 文件  
如果你需要確保數據庫服務已準備好，可以在 docker-compose.yml 文件中添加依賴性檢查：  
```yaml  
version: '3'

services:
  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: yourdbname
      POSTGRES_USER: yourdbuser
      POSTGRES_PASSWORD: yourdbpassword

  web:
    build: .
    command: sh -c "python manage.py migrate && gunicorn mysite.wsgi:application --bind 0.0.0.0:8000"
    volumes:
      - .:/code
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://yourdbuser:yourdbpassword@db:5432/yourdbname

volumes:
  postgres_data:

```  