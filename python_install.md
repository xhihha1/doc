# python 打包成 exe  

- 安裝 virtualenv  
- 在`env`環境安裝 pyinstaller  
- 注意 python 不要使用到 windows 內建的，會找不到lib.  

## 安裝 virtualenv  

	pip installer virtualenv  

### 使用 virtualenv  

使用 env 建立專案目錄 proj01  

	virtualenv proj01  
	
從命令提示字元(終端機)進入到 `proj01\Scripts` 目錄下執行`activate`指令  

	activate  
	
退出  

	deactivate  

# Linux / macOS  

	source ./bin/activate  

## 在 env 環境安裝 pyinstaller  

	pip installer pyinstaller  
	
# 執行 pyinstaller 打包成 exe  

縮寫指令   | 完整指令    | 說明  
-----------|:-----------:|-----------------------------------------
-D         |--onedir     | default:將所有的東西打包到一個資料夾中  
-F         |--onefile    | 將所有的東西打包到一個檔案中，ex: windows的exe檔  
--specpath |             | 輸出spec檔案到指定的資料夾  
-n Name    | --name Name | 打包的檔名  

build完exe會自動產生以下目錄  

檔案        | 說明  
------------|--------------------------
build資料夾 | 編譯執行檔過程的產物，先不須理會  
dist 資料夾 | :accept: 編譯的結果，也就是我們要的執行檔  
main.spec   | 其實是根據使用者針對pyinstaller有使用到的功能，整理成spec檔，進階的方式也可以進去裡面修改。  


針對要編譯的檔案(main.py)執行  

	pyinstaller main.py  
	
或是加入參數  

	pyinstaller -F main.py  

如果要關閉執行 exe時自動彈出的 console，要開啟 spec檔，修改 exe > console > False  
重新執行  

	pyinstaller main.spec  
	
如果有遺漏的套件在 spec下 a > hiddenimports 手動加入  

[參考1](https://ithelp.ithome.com.tw/articles/10230557)  

# desktop icon  

[參考 icon](https://stackoverflow.com/questions/9946760/add-image-to-spec-file-in-pyinstaller)




# Package  
 
參考PEP328提供的範例。Package 架構如下  

	package
	├── __init__.py
	├── subpackage1
	│   ├── __init__.py
	│   ├── moduleX.py
	│   └── moduleY.py
	├── subpackage2
	│   ├── __init__.py
	│   └── moduleZ.py
	└── moduleA.py
	

**package/subpackage1/moduleX.py想要從其他 module 裡 import**  

Import 同一個 package 底下的 sibling module `moduleY`  
A. from `package.subpackage1` import moduleY  
R. from `.` import moduleY  

從同一個 package 底下的 sibling module `moduleY` 中，import `spam` 這個 function  
A. from `package.subpackage1.moduleY` import spam  
R. from `.moduleY` import spam  

從隔壁 package 底下的 module `moduleZ` 中，import `eggs` 這個 function  
A. from `package.subpackage2.moduleZ` import eggs  
R. from `..subpackage2.moduleZ` import eggs  

Import parent package 底下的 module `moduleA`  
A. from `package` import moduleA  
R. from `..` import moduleA 或 from ... package import moduleA	 

- A. 表 absolute import 範例  
- R. 表 relative import 範例  
- Relative import 裡，..代表上一層 ，多幾個.就代表多上幾層。  
- Relative import 一律採用 from ... import ...語法，即使是從 . import也要寫 from . import some_module 而非 import .some_module。原因是.some_module這個名稱在 expression 裡無法出現。Absolute import 則無限制。  


# 打包使用 Nuitka 取代 pyInstaller  

範例：  

	nuitka --mingw64 --windows-disable-console --standalone --show-progress --show-memory --plugin-enable=qt-plugins --include-qt-plugins=sensible,styles --plugin-enable=pylint-warnings --recurse-all --recurse-not-to=numpy,jinja2 --output-dir=out index.py
一、  

需要 `C` 編譯器，建議安裝 [MinGW64](http://mingw-w64.org/doku.php)  
在`C:\mingw64\bin`目錄下執行 `gcc.exe --version` 驗證是否有效  
安裝完成後要將 `C:\mingw64\bin` 目錄添加至環境變量中。  

二、  
安裝 nuitka  

	pip install nuitka

	--nofollow-imports  # 所有的import不编译，交给python3x.dll执行
	--follow-import-to=need  # need为你需要编译成C/C++的py文件夹命名

三、  
參數語法說明  

	--mingw64 #指定 C編譯器使用mingw64，預設使用 vs c++ 編譯，官方建議使用 mingw  

	--standalone 打包成獨立文件  

	--windows-disable-console 運行時，隱藏CMD視窗  

	--recurse-all 添加所有資源  

	-recurse-not-to=numpy,jinja2 選擇移除不需要編譯的模組 ex. numpy、jinja2  

	--output-dir=out 指定生成執行檔exe到out目錄下  

	--show-progress 顯示進度

	--show-memory 顯示記憶體使用狀況

	--plugin-enable=pylint-warnings 編譯時添加警報訊息  

	--include-qt-plugins=sensible,styles 打包PyQt的樣式就會固定

	--plugin-enable=qt-plugins 需要加载的PyQt插件

	--plugin-enable=tk-inter 打包tkinter模組  (不打包模組時不要添加 --nofollow-imports)  

	--plugin-enable=numpy 打包numpy,pandas,matplotlib模組  (不打包模組時不要添加 --nofollow-imports)  

	--plugin-enable=torch 打包pytorch  (不打包模組時不要添加 --nofollow-imports)  

	--plugin-enable=tensorflow 打包tensorflow  (不打包模組時不要添加 --nofollow-imports)  

	--windows-icon=XXX.ico 軟體 icon  

	--nofollow-imports  # 所有的import套件模組都不打包，交给python3x.dll執行，在編譯後的dist目錄下會有對應 python 版本的 dll. 例: python39.dll.  

	--follow-import-to=(Module / Package)  # 添加需要編譯成 C/C++的 py 文件或是資料夾名稱  

**follow import**  
相關參數  

	--follow-stdlib, --recurse-stdlib  # 選用標準  
                        Also descend into imported modules from standard
                        library. This will increase the compilation time by a
                        lot. Defaults to off.
    --nofollow-imports, --recurse-none  # 全不選  
                        When --recurse-none is used, do not descend into any
                        imported modules at all, overrides all other recursion
                        options. Defaults to off.
    --follow-imports, --recurse-all  # 全選
                        When --recurse-all is used, attempt to descend into
                        all imported modules. Defaults to off.
    --follow-import-to=MODULE/PACKAGE, --recurse-to=MODULE/PACKAGE  # 選用指定的模組套件
                        Recurse to that module, or if a package, to the whole
                        package. Can be given multiple times. Default empty.
    --nofollow-import-to=MODULE/PACKAGE, --recurse-not-to=MODULE/PACKAGE  # 不選指定模組套件
                        Do not recurse to that module name, or if a package
                        name, to the whole package in any case, overrides all
                        other options. Can be given multiple times. Default
                        empty.

**不打包模組套件，說明**  
例：  

	nuitka --mingw64 --standalone --show-progress --show-memory --nofollow-imports --follow-import-to=archsMul2 --follow-import-to錯誤=dataset --output-dir=result_1 busi_inf_2.py

使用 `nofollow-imports` 時，相關的套件函式庫放到 exe 同級目錄，使用`--follow-import-to`將要編譯的檔案加入到exe中。  
此時不需要使用 `--plugin-enable` 將套件加入。直接在編完後從環境中將檔案加入。  
如果是使用 virtualenv時，相關套件檔案都在 `Lib\site-packages`  

編譯後產出的 `exe` 會在 `dist`目錄下，直接執行會發現有錯誤發生，例如:  

	ModuleNotFoundError: No module named 'torchvision'

請依照模組名稱，到`site-packages`目錄下，將對應的模組套件加入到 exe的同級目錄。  

**模块搜索路径**  
python使用環境變量sys.path管理这些路径，
import sys print(sys.path) # 印出對應路徑  
確認運行環境中的sys.path，對應的函式庫是否存在。  


## 64位元 與 32位元  

打包64位元時， windows, python, mingw 都要使用64位元。  
同樣打包32位元時，windows, python, mingw 都要使用32位元。

# (以下從參照文件 Nuitka-Python打包exe 節錄)  
# 发布一个程序 

如果python程序中仅仅使用了一些自定义的模块，那么参数--follow-imports就足以达到发布的效果，一个exe外加一个python3x.dll就可以在任何电脑上运行，无论是否安装python（当然架构要对应），然而实际情况往往比较复杂，稍微强大一点的程序都会调用一些第三方库，比如pyqt，numpy，这些模块中调用了大量的pyd或者dll文件。这个时候就需要使用参数--standalone。

参数--standalone默认包含参数--follow-imports，即会尝试对所有的引用到的库都进行打包，将这些库中的py或者pyc打包进exe，然后再将所依赖的二进制文件（dll或者pyd）拷贝到exe所在文件夹。只要命令能够执行完成不出错，生成的exe就可以完全脱离python环境独立运行。

## depends.exe  
在第一次使用--standalone时，会提示安装Dependency Walker，nuitka需要使用这个工具来解析所有的依赖，从而决定拷贝哪些文件(dll,pyd)到exe目录。命令进行的过程中会自动检测该工具是否存在，没有的话会自动提示进行下载，网络没问题的时候直接回车或者输入yes就行了，但是如果网络状况不佳，就需要提前手动下载，否则命令会因此中断。
具体步骤：手动下载和系统相匹配的版本（32位或64位），解压得到以下两个文件
depends.exe depends.dll
然后放置到对应的目录 x86的路径
C:\Users\Administrator\AppData\Local\Nuitka\Nuitka\x86\
X64的路径
C:\Users\Administrator\AppData\Local\Nuitka\Nuitka\x86_64\
ps：我尝试过将工具放在path中，没有用，只能放在上面的路径里面

可以通过参数--windows-dependency-tool=DEPENDENCY_TOOL将其修改为其他依赖解析工具，比如pefile,但是不建议修改。参数--windows-dependency-tool=DEPENDENCY_TOOL仅限windows系统使用

## 参数--mingw64  
实际上 --mingw64与--msvc=MSVC是一对孪生参数，这两个参数二选一，用于指定编译器，如果当前环境既安装了mingw64，又安装了msvc，可以使用该参数选择兼容性最好的编译器,建议使用mingw64。如果不存在上面两种编译器都存在的情况，就不需要显式设置这个参数，默认会调用系统中能用的编译器。


## 参数plugin control
这部分参数用于设置对某些第三方库或者python功能进行支持，在使用--standalone时才会用到

如果程序中使用了pyqt或者pyside，那么

	--plugin-enable=qt-plugins

如果程序中使用了numpy, scipy, pandas, matplotlib，那么

	--plugin-enable=numpy

如果使用了这些库或功能，但是忘了进行插件参数设置，命令运行过程中会以红字今天提醒，按照提醒对命令进行调整即可

如果有多个插件需要启用

	--plugin-enable=numpy   --plugin-enable=qt-plugins  --plugin-enable=tensorflow


可以使用 nuitka --plugin-list查看可用的插件

	C:\Users\Administrator\Desktop\a>nuitka  --plugin-list
			The following optional standard plugins are available in Nuitka
	--------------------------------------------------------------------------------
	data-files
	dill-compat
	enum-compat
	eventlet          Required by the eventlet package
	gevent            Required by the gevent package
	implicit-imports
	multiprocessing   Required by Python's multiprocessing module
	numpy             Required for numpy, scipy, pandas, matplotlib, etc.
	pbr-compat
	pmw-freezer       Required by the Pmw package
	pylint-warnings   Support PyLint / PyDev linting source markers
	qt-plugins        Required by the PyQt and PySide packages
	tensorflow        Required by the tensorflow package
	tk-inter          Required by Python's Tk modules
	torch             Required by the torch / torchvision packages


## 参数Output choices  

## -o FILENAME  

指定生成的可执行文件的文件名，但是生成pyd的时候无法使用，也就是在使用--module的时候无法为pyd文件指定一个其他的文件名

## --output-dir=DIRECTORY

指定打包好的文件存放的目录，默认为当前目录

## --remove-output

使用nuitka进行打包的过程中，会生成一个用于build的中间临时目录，若可以使用该参数，命令完成后会自动删除build目录

## --no-pyi-file

不生成pyi文件。pyi文件主要用于生成pyd文件时进行隐式import的检测



## 参数--show-progress 和--show-scons

用来显示详细打包过程，看得懂的话就加上吧，这部分还有几个参数，感兴趣的可以试试

    --show-scons        Operate Scons in non-quiet mode, showing the executed
                        commands. Defaults to off.
    --show-progress     Provide progress information and statistics. Defaults
                        to off.
    --show-memory       Provide memory information and statistics. Defaults to
                        off.
    --show-modules      Provide a final summary on included modules. Defaults
                        to off.
    --verbose           Output details of actions taken, esp. in
                        optimizations. Can become a lot. Defaults to off.


## 数 --windows-disable-console
禁用终端窗口，当程序有一个图形化界面的时候经常用到，仅限windows系统

## 参数 --windows-icon=ICON_PATH
设定程序的图标，仅限windows系统



----------------------------------------------------------- 深水区警告 --------------------------------------------------------------------

对反射的支持

python的反射机制，简而言之，就是可以通过字符串，动态调用一些库或者模块，诸如根据用户的输入调用插件等。

	pack_name=input("input the package name:")
	pack=__import__(pack_name)

上面这种情况，pack到底是哪个库，完全依赖于用户输入，nuitka没法利用follow import这部分参数确定可能会被用到的库。这种情况下可以不对这些库进行打包，那么打包好的exe只要在搜索路径中能够找到这些库，程序依然可以正常运行。

但如果希望能够将这些模块打包为二进制（exe或者pyd），那么就要用到--include这部分参数

	nuitka --follow-imports --include-package=testPackage mx.py

nuitka就会将这个package强行打包进exe，如果运行的时需要进行调用，程序就会在exe里面进行寻找，看看有没有这个package

## include部分有四个具体的参数
指定一个package

	--include-package=PACKAGE

指定一个module

	--include-module=MODULE

指定一个目录，里面包含的所有包/模块都会被打包（覆盖其他递归选项）

	--include-plugin-directory=MODULE/PACKAGE

与pattern匹配的所有文件都会被打包（覆盖其他递归选项）

	--include-plugin-files=PATTERN


## 使用参数--module打包生成pyd文件

使用--module参数，将包/模块打包为二进制的pyd文件。module在这里可能会有点歧义，实际上借助--include参数，对于包/模块/目录（package/module/directory），都能打包为pyd。

打包一个package

	nuitka --module --include-package=PACKAGE  PACKAGE  

打包一个module

	nuitka --module --include-module=MODULE    MODULE 

打包一个目录

	nuitka --module --include-plugin-directory=DIRECTORY    DIRECTORY

打包一堆零散文件，与pattern匹配的所有文件都会被打包

	nuitka --module --include-plugin-files=PATTERN    mods

打包pyd文件，必须借助--include参数,这是因为打包pyd的时候没有入口文件，所以就没有import可以follow，因此就必须要用到include对整个包进行指定，否则打包出来的pyd文件里面不会有任何的内容，引用这个pyd文件会提示找不到模块


ps:打包pyd过程中如果出现类似警告提示

	Nuitka:WARNING:Recursed to package 'TestPackage' at 'C:\Users\Administrator\Desktop\a\TestPackage' twice.

作者说不用管，原话如下

	I think this one is actually described in the user manual.

	We compile the filename you give as a module, even if it is a package, giving an empty package. Then you get to force inclusion of a whole module, which makes it see the top level twice, ignoring it, which triggers the warning.


常见错误

（逐渐添加）


	**ImportError: DLL load failed while importing xxxxx: %1 is not a valid Win32 application.**

加载pyd模块时发生

原因：vscode没有正确初始化

解决方法：直接在终端中运行python

编译模块时候发生

	ImportError: dynamic module does not define module export function (PyInit_TestPackage2)

原因：使用参数--module编译出来的pyd文件，不能更改文件名

处理机制。



## nuitka参数列表

输入nuitka，回车之后会显示nuitka的参数列表

	Usage: __main__.py [--module] [--run] [options] main_module.py

	Options:
	--version             show program's version number and exit
	-h, --help            show this help message and exit
	--module              Create an extension module executable instead of a
							program. Defaults to off.
	--standalone          Enable standalone mode in build. This allows you to
							transfer the created binary to other machines without
							it relying on an existing Python installation. It
							implies these option: "--recurse-all". You may also
							want to use "--python-flag=no_site" to avoid the
							"site.py" module, which can save a lot of code
							dependencies. Defaults to off.
	--python-arch=PYTHON_ARCH
							Architecture of Python to use. One of "x86" or
							"x86_64". Defaults to what you run Nuitka with
							(currently "x86_64").
	--python-debug        Use debug version or not. Default uses what you are
							using to run Nuitka, most likely a non-debug version.
	--python-flag=PYTHON_FLAGS
							Python flags to use. Default uses what you are using
							to run Nuitka, this enforces a specific mode. These
							are options that also exist to standard Python
							executable. Currently supported: "-S" (alias
							"nosite"), "static_hashes" (do not use hash
							randomization), "no_warnings" (do not give Python
							runtime warnings), "-O" (alias "noasserts"). Default
							empty.
	--python-for-scons=PYTHON_SCONS
							If using Python3.3 or Python3.4, provide the path of a
							Python binary to use for Scons. Otherwise Nuitka can
							use what you run Nuitka with or a "scons" binary that
							is found in PATH, or a Python installation from
							Windows registry.
	--warn-implicit-exceptions
							Enable warnings for implicit exceptions detected at
							compile time.
	--warn-unusual-code   Enable warnings for unusual code detected at compile
							time.
	--assume-yes-for-downloads
							Allow Nuitka to download code if necessary, e.g.
							dependency walker on Windows.

	Control the inclusion of modules and packages:
		--include-package=PACKAGE
							Include a whole package. Give as a Python namespace,
							e.g. ``some_package.sub_package`` and Nuitka will then
							find it and include it and all the modules found below
							that disk location in the binary or extension module
							it creates, and make it available for import by the
							code. Default empty.
		--include-module=MODULE
							Include a single module. Give as a Python namespace,
							e.g. ``some_package.some_module`` and Nuitka will then
							find it and include it in the binary or extension
							module it creates, and make it available for import by
							the code. Default empty.
		--include-plugin-directory=MODULE/PACKAGE
							Include the content of that directory, no matter if
							it's used by the given main program in a visible form.
							Overrides all other recursion options. Can be given
							multiple times. Default empty.
		--include-plugin-files=PATTERN
							Include into files matching the PATTERN. Overrides all
							recursion other options. Can be given multiple times.
							Default empty.

	Control the recursion into imported modules:
		--follow-stdlib, --recurse-stdlib
							Also descend into imported modules from standard
							library. This will increase the compilation time by a
							lot. Defaults to off.
		--nofollow-imports, --recurse-none
							When --recurse-none is used, do not descend into any
							imported modules at all, overrides all other recursion
							options. Defaults to off.
		--follow-imports, --recurse-all
							When --recurse-all is used, attempt to descend into
							all imported modules. Defaults to off.
		--follow-import-to=MODULE/PACKAGE, --recurse-to=MODULE/PACKAGE
							Recurse to that module, or if a package, to the whole
							package. Can be given multiple times. Default empty.
		--nofollow-import-to=MODULE/PACKAGE, --recurse-not-to=MODULE/PACKAGE
							Do not recurse to that module name, or if a package
							name, to the whole package in any case, overrides all
							other options. Can be given multiple times. Default
							empty.

	Immediate execution after compilation:
		--run               Execute immediately the created binary (or import the
							compiled module). Defaults to off.
		--debugger, --gdb   Execute inside "gdb" to automatically get a stack
							trace. Defaults to off.
		--execute-with-pythonpath
							When immediately executing the created binary
							(--execute), don't reset PYTHONPATH. When all modules
							are successfully included, you ought to not need
							PYTHONPATH anymore.

	Dump options for internal tree:
		--xml               Dump the final result of optimization as XML, then
							exit.

	Code generation choices:
		--full-compat       Enforce absolute compatibility with CPython. Do not
							even allow minor deviations from CPython behavior,
							e.g. not having better tracebacks or exception
							messages which are not really incompatible, but only
							different. This is intended for tests only and should
							not be used for normal use.
		--file-reference-choice=FILE_REFERENCE_MODE
							Select what value "__file__" is going to be. With
							"runtime" (default for standalone binary mode and
							module mode), the created binaries and modules, use
							the location of themselves to deduct the value of
							"__file__". Included packages pretend to be in
							directories below that location. This allows you to
							include data files in deployments. If you merely seek
							acceleration, it's better for you to use the
							"original" value, where the source files location will
							be used. With "frozen" a notation "<frozen
							module_name>" is used. For compatibility reasons, the
							"__file__" value will always have ".py" suffix
							independent of what it really is.

	Output choices:
		-o FILENAME         Specify how the executable should be named. For
							extension modules there is no choice, also not for
							standalone mode and using it will be an error. This
							may include path information that needs to exist
							though. Defaults to <program_name> on this platform.
							.exe
		--output-dir=DIRECTORY
							Specify where intermediate and final output files
							should be put. The DIRECTORY will be populated with C
							files, object files, etc. Defaults to current
							directory.
		--remove-output     Removes the build directory after producing the module
							or exe file. Defaults to off.
		--no-pyi-file       Do not create a ".pyi" file for extension modules
							created by Nuitka. This is used to detect implicit
							imports. Defaults to off.

	Debug features:
		--debug             Executing all self checks possible to find errors in
							Nuitka, do not use for production. Defaults to off.
		--unstripped        Keep debug info in the resulting object file for
							better debugger interaction. Defaults to off.
		--profile           Enable vmprof based profiling of time spent. Not
							working currently. Defaults to off.
		--graph             Create graph of optimization process. Defaults to off.
		--trace-execution   Traced execution output, output the line of code
							before executing it. Defaults to off.
		--recompile-c-only  This is not incremental compilation, but for Nuitka
							development only. Takes existing files and simply
							compile them as C again. Allows compiling edited C
							files for quick debugging changes to the generated
							source, e.g. to see if code is passed by, values
							output, etc, Defaults to off. Depends on compiling
							Python source to determine which files it should look
							at.
		--generate-c-only   Generate only C source code, and do not compile it to
							binary or module. This is for debugging and code
							coverage analysis that doesn't waste CPU. Defaults to
							off. Do not think you can use this directly.
		--experimental=EXPERIMENTAL
							Use features declared as 'experimental'. May have no
							effect if no experimental features are present in the
							code. Uses secret tags (check source) per experimented
							feature.
		--disable-dll-dependency-cache
							Disable the dependency walker cache. Will result in
							much longer times to create the distribution folder,
							but might be used in case the cache is suspect to
							cause errors.
		--force-dll-dependency-cache-update
							For an update of the dependency walker cache. Will
							result in much longer times to create the distribution
							folder, but might be used in case the cache is suspect
							to cause errors or known to need an update.

	Backend C compiler choice:
		--clang             Enforce the use of clang. On Windows this requires a
							working Visual Studio version to piggy back. Defaults
							to off.
		--mingw64           Enforce the use of MinGW64 on Windows. Defaults to
							off.
		--msvc=MSVC         Enforce the use of specific MSVC version on Windows.
							Allowed values are e.g. 14.0, specify an illegal value
							for a list of installed compilers.  Defaults to the
							most recent version.
		-j N, --jobs=N      Specify the allowed number of parallel C compiler
							jobs. Defaults to the system CPU count.
		--lto               Use link time optimizations if available and usable
							(gcc 4.6 and higher). Defaults to off.

	Tracing features:
		--show-scons        Operate Scons in non-quiet mode, showing the executed
							commands. Defaults to off.
		--show-progress     Provide progress information and statistics. Defaults
							to off.
		--show-memory       Provide memory information and statistics. Defaults to
							off.
		--show-modules      Provide a final summary on included modules. Defaults
							to off.
		--verbose           Output details of actions taken, esp. in
							optimizations. Can become a lot. Defaults to off.

	Windows specific controls:
		--windows-dependency-tool=DEPENDENCY_TOOL
							When compiling for Windows, use this dependency tool.
							Defaults to depends.exe, other allowed value is
							'pefile'.
		--windows-disable-console
							When compiling for Windows, disable the console
							window. Defaults to off.
		--windows-icon=ICON_PATH
							Add executable icon (Windows only).

	Plugin control:
		--plugin-enable=PLUGINS_ENABLED, --enable-plugin=PLUGINS_ENABLED
							Enabled plugins. Must be plug-in names. Use --plugin-
							list to query the full list and exit. Default empty.
		--plugin-disable=PLUGINS_DISABLED, --disable-plugin=PLUGINS_DISABLED
							Disabled plugins. Must be plug-in names. Use --plugin-
							list to query the full list and exit. Default empty.
		--plugin-no-detection
							Plugins can detect if they might be used, and the you
							can disable the warning via --plugin-disable=plugin-
							that-warned, or you can use this option to disable the
							mechanism entirely, which also speeds up compilation
							slightly of course as this detection code is run in
							vain once you are certain of which plug-ins to use.
							Defaults to off.
		--plugin-list       Show list of all available plugins and exit. Defaults
							to off.
		--user-plugin=USER_PLUGINS
							The file name of user plugin. Can be given multiple
							times. Default empty.

[MinGW64 8.1](http://mingw-w64.org/doku.php)  
[Python打包exe的王炸-Nuitka](https://zhuanlan.zhihu.com/p/133303836)  
[Nuitka-Python打包exe](https://zhuanlan.zhihu.com/p/165978688)