1、配置使用者資訊  

	git config –global user.name [username]  

	git config –global user.email  

2、查詢使用者資訊  

	git config -–list  

3、如果push遇到在輸入密碼是熟錯後，就會報這個錯誤fatal: Authentication failed for  

解決辦法： 

	git config -–system –-unset credential.helper  

之後你在push就會提示輸入名稱和密碼  