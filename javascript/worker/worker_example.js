var workerUtil = {}
workerUtil.buildWorker = function(foo){
	var str = foo.toString()
			  .match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1];
	return  new Worker(window.URL.createObjectURL(
					   new Blob([str],{type:'text/javascript'})));
 }
 
 workerUtil.worker = workerUtil.buildWorker(function(){
    self.onmessage = function (e) {
        if(e.data){}
    }
 })