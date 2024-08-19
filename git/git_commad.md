# Git  

# 1. 基本操作
`git init`：初始化一个新的 Git 仓库。  
`git clone <repository_url>`：从远程仓库克隆代码到本地。  
`git status`：查看当前工作目录的状态，包括变更的文件。  
`git add <file>`：将文件添加到暂存区，准备提交。  
`git commit -m "<commit_message>"`：提交暂存区的更改，并添加提交信息。  
`git push`：将本地提交的更改推送到远程仓库。  
`git pull`：从远程仓库拉取最新的更改并合并到本地分支。  

# 2. 分支操作  
`git branch`：查看本地分支列表，当前分支会以 * 标记。  
`git branch <branch_name>`：创建一个新分支。  
`git checkout <branch_name>`：切换到指定分支。  
`git merge <branch_name>`：将指定分支合并到当前分支。  
`git branch -d <branch_name>`：删除指定的本地分支。  

# 3. 远程仓库操作  
`git remote -v`：查看已配置的远程仓库列表及其 URL。  
`git remote add <name> <url>`：添加一个新的远程仓库。  
`git fetch <remote>`：从远程仓库获取最新的代码，但不合并到当前分支。  
`git push <remote> <branch>`：将本地分支推送到指定的远程分支。  
`git pull <remote> <branch>`：从远程分支拉取并合并代码到当前分支。  

# 4. 查看历史  
`git log`：查看提交历史。  
`git log --oneline`：简洁模式查看提交历史，每个提交占一行。  
`git diff`：查看尚未暂存的更改。  
`git diff --staged`：查看已暂存的更改。  

# 5. 撤销操作  
`git reset <file>`：取消暂存区中的文件。  
`git checkout -- <file>`：撤销工作目录中的改动，将文件恢复到最后一次提交的状态。  
`git revert <commit>`：创建一个新提交，用来撤销指定的历史提交。  

# 6. 标签操作  
`git tag`：顯示所有標籤。  
`git tag <tag_name>`：为当前提交打上标签。  
`git push origin <tag_name>`：将标签推送到远程仓库。  
`git tag -d <tag_name>`：删除本地标签。  
`git fetch --tags`：更新標籤。  

`q`：離開操作。  