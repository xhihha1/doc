# WSL Installation:(PowerShell as Administrator)  

1. Open PowerShell as Administrator
2. Install the WSL

		wsl --install

3. Make sure to use WSL version 2

		wsl -l -v

	To change the version

		wsl --set-default-version 2

可能會有安裝多個分發版

		NAME                   STATE           VERSION
		* Ubuntu                 Running         2
		Debian                 Stopped         2
		Kali-linux             Stopped         2
		openSUSE-42            Stopped         2


4. Open the WSL

	wsl

進入特定的分發版`wsl`  

	wsl -d Debian

使用 root 身分進入  

	wsl -d Debian -u root

5. 刪除分發版  

		wsl --unregister <分發版名稱>   
		wsl --unregister Debian  


6. 離開 wsl 環境  

		exit  

# Docker Installation:  

For simple version:

	sudo apt-get install docker.io docker-compose -y
	sudo usermod -aG docker $USER

## Running the Docker Daemon:  

	sudo dockerd

背景執行:  

	sudo dockerd &

Note.  
If you use the simple version, do not close the docker daemon sudo dockerd from the previous PowerShell, or you can run it in background with sudo dockerd &. Use fg to bring it back to the foreground.  

# FAQ  