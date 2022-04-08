# Download text  

	<html>
		<body>
			<button id="btn">Save</button>
			<a href="/images/myw3schoolsimage.jpg" download>123</a>
		</body>
		<script>
			document.getElementById('btn').onclick = function(){
				download("hello.txt","This is the content of my file :)");
			}
			function download(filename, text) {
			  var element = document.createElement('a');
			  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			  element.setAttribute('download', filename);

			  element.style.display = 'none';
			  document.body.appendChild(element);

			  element.click();

			  document.body.removeChild(element);
			}


			download("hello.txt","This is the content of my file :)");
		</script>
	</html>
	
	
https://hsuchihting.github.io/javascript/20200513/3866185586/

# Read Text File
https://www.geeksforgeeks.org/how-to-read-a-local-text-file-using-javascript/

	<!DOCTYPE html>
	<html>
	  
	<head>
		<title>Read Text File</title>
	</head>
	  
	<body>
		<input type="file" name="inputfile"
				id="inputfile">
		<br>
	   
		<pre id="output"></pre>
		  
		<script type="text/javascript">
			document.getElementById('inputfile')
				.addEventListener('change', function() {
				  
				var fr=new FileReader();
				fr.onload=function(){
					document.getElementById('output')
							.textContent=fr.result;
				}
				  
				fr.readAsText(this.files[0]);
			})
		</script>
	</body>
	  
	</html>