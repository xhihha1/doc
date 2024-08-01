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
```
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

    def __str__(self):
        return self.title
```
6. 創建數據庫遷移並應用  
```
python manage.py makemigrations
python manage.py migrate
```
`myapp/models.py` 下會產生`migrations`目錄  
7. 設置管理界面  
在 myapp/admin.py 文件中註冊 Post 模型，以便在 Django 管理界面中管理：  
```  
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```  
8. 創建視圖和模板  
在 myapp/views.py 中創建一個簡單的視圖來顯示所有的 Post：  
```
from django.shortcuts import render
from .models import Post

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'myapp/post_list.html', {'posts': posts})

```
創建模板文件夾和模板文件。在 myapp 文件夾內創建一個名為 templates 的文件夾，再在其中創建 myapp 文件夾，並在其中創建 post_list.html 文件：  
```
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
```
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
]
```
將 myapp 的 URL 配置包含在主項目的 URL 配置中。在 mysite/urls.py 文件中添加：  
```
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

* 修改 port
* 修改 db
* 搭配 vue, react