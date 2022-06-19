/** csv file
a,b,c
1,2,3
4,5,6
*/
// const csvFilePath='list.csv'
// const csv=require('csvtojson')
// csv()
// .fromFile(csvFilePath)
// .on('json',(jsonObj)=>{
// 	console.log(jsonObj);
//     // combine csv header row and csv line to a json object
//     // jsonObj.a ==> 1 or 4
// })
// .on('done',(error)=>{
//     console.log('end')
// })
const fs = require('fs');

function toHTML(jsonObj){

var html = '';
html += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
html += '<html xmlns="http://www.w3.org/1999/xhtml">';
html += '<head>';
html += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
html += '<title></title>';
html += '<link rel="stylesheet" href="style.css">';
html += '</head>';

html += '<body>';
html += '<div class="book">';


for(var i=0;i<jsonObj.length;i++){
	if(i%4 == 0){html += '  <div class="page">';}
	  html += '<div class="subpage">';
      html +=     '<p class="light">105 台北市民權東路三段106巷23號4樓</p>';
      html +=     '<p class="light">夜市人蔘 - 綜恆 02-25461777</p>';
      html +=     '<p>&nbsp;</p>';
      html +=     '<p class="thicker">To:';
      html +=     '  <span>'+jsonObj[i]['郵遞區號']+'</span> <span>'+jsonObj[i]['地址']+'</span> </p>';
      html +=     '<p class="thicker"><span>'+jsonObj[i]['收件人名']+'</span></p>';
      html +=     '<p class="thicker"><span>'+jsonObj[i]['電話']+'</span></p>';
      html += '</div> ';
	if(i%4 == 3 || i == (jsonObj.length -1)){html += '    </div>';}
}


html += '</div>';
html += '</body>';
html += '<script>';
html += '  window.print();';
html += '</script>';
html += '</html>';
return html;
}



xlsxj = require("xlsx-to-json");
  xlsxj({
    input: "lists.xlsx", 
    output: "output.json"
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      console.log(result);
      fs.writeFile('message.html', toHTML(result), (err) => {
  		if (err) throw err;
  		console.log('The file has been saved!');
	  });
    }
  });