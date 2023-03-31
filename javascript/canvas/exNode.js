const express = require('express');
const miio = require('miio');
const app = express();

let camera;

app.get('/', async (req, res) => {
  const stream = await camera.createStream();
  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=boundary'
  });
  stream.on('data', (data) => {
    res.write('--boundary\r\n');
    res.write('Content-Type: image/jpeg\r\n');
    res.write(`Content-Length: ${data.length}\r\n`);
    res.write('\r\n');
    res.write(data, 'binary');
    res.write('\r\n\r\n');
  });
});

app.listen(3000, async () => {
  camera = await miio.device({ address: '192.168.1.xxx', token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
  await camera.init();
  console.log('小米智慧攝像機已連接');
  console.log('正在啟動網頁伺服器，請訪問http://localhost:3000');
});

/*
要在Node.js中使用小米智慧攝影機的address和token，需要通過小米智慧家庭開發平臺獲取。具體步驟如下：
下載並安裝小米智慧家庭開發者APP，並使用小米賬號登錄。
在APP中添加小米智慧攝影機，並確認設備能夠正常運作。
進入小米智慧家庭開發平臺的網站（https://www.yinsee.cn）並使用小米賬號登錄。
創建一個新的項目（Project），並在該項目中添加小米智慧攝影機的設備。
獲取小米智慧攝影機的address和token，並紀錄下來以進行下一步的程式設計。可以通過小米智慧家庭開發平臺提供的API進行獲取。可以使用以下api進行獲取，需要在小米智慧家庭開發平臺設定中添加該API的授權：
https://api.io.mi.com/app/token/device?languafe=en&did=YOUR_DEVICE_ID&apikey=YOUR_MIIO_APIKEY&ts=YOUR_MIIO_TIMESTAMP&sign=YOUR_MIIO_SIGN
其中YOUR_DEVICE_ID是小米智慧攝影機的设备ID，YOUR_MIIO_APIKEY是你在小米智慧家庭開發平臺上獲取的API密鑰，YOUR_MIIO_TIMESTAMP和YOUR_MIIO_SIGN是用於保證請求的安全性和有效性的參數，可以通過相應的算法進行計算。
*/