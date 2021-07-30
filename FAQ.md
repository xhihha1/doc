

# 報錯：exec:"gcc" executable file not found in %PATH%

[https://www.itread01.com/content/1556564403.html](https://www.itread01.com/content/1556564403.html)  

**Windows下解決方法**  
1. 下載mingw64，並安裝  
下載地址：https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe/download

[安裝教學](https://alexmav04.github.io/computer/windows-with-mingw-w64/)  

Architecture 要選 `86_64`才會裝64位元版本，否則會裝到 32位元版本。  


2. 設定環境變數  
將安裝目錄下的bin資料夾新增到Path環境變數中：  

    C:\Program Files (x86)\mingw-w64\i686-8.1.0-posix-dwarf-rt_v6-rev0\mingw32\bin  
    C:\Program Files\mingw-w64\x86_64-8.1.0-posix-seh-rt_v6-rev0

3. 測試是否安裝成功  
開啟cmd命令列，輸入：  

    gcc -v  