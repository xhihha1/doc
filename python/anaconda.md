Anaconda致力於簡化軟體套件管理系統和部署。Anaconda的包使用軟體套件管理系統Conda進行管理。  

# FAQ  

## Import Error: cannot import name 'ft2font' from partially initialized module 'matplotlib'  

This could be an issue regarding of matplotlib. A force reinstall over pip would solve the issue.  

    pip install matplotlib --force-reinstall

If you are woriking on Anaconda. Launch Anaconda as Administrator,  

    conda install freetype --force-reinstall