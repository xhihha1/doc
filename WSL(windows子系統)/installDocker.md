# WSL Installation:(PowerShell as Administrator)  

1. Open PowerShell as Administrator
2. Install the WSL

	wsl --install

3. Make sure to use WSL version 2

	wsl -l -v
	To change the version
	wsl --set-default-version 2

4. Open the WSL

	wsl

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