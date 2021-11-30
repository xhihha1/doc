@ECHO OFF
start cmd.exe /C "python -m http.server 2041"
start chrome http://127.0.0.1:2041/index.html