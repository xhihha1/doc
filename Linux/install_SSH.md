# 安裝SSH 讓Linux系統可以被遠端操作  

[https://magiclen.org/linux-ssh/](https://magiclen.org/linux-ssh/)  

    sudo apt-get install ssh  


# SSH on Windows Subsystem for Linux (WSL)
https://www.illuminiastudios.com/dev-diaries/ssh-on-windows-subsystem-for-linux/

    sudo apt remove openssh-server
    sudo apt-get install openssh-server

**Edit the sshd_config**  

- Edit the `sshd_config` file by running the command `sudo vi /etc/ssh/sshd_config`  
- In the sshd_config file:  
    - Change `PasswordAuthentication` to `yes` (vi中輸入按下 i, I, o, O, a, A, r, R 可進入編輯模式，`Esc`退出編輯模式)  
    - Add your login user to the bottom of the file by using this command: `AllowUsers yourusername`. Don’t forget to replace `“yourusername”` with your actually username.  
    - :wq (在vi一般模式下，輸入`:`進入指令列命令模式，輸入`:wq`，表示存檔離開)  

