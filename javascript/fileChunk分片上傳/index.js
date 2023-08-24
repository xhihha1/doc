const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
const { Buffer } = require('buffer')
// file path
const STATIC_FILES = path.join(__dirname, './uploads')
// Temporary path to upload files
const STATIC_TEMPORARY = path.join(__dirname, './temporary')
const server = express()
// Static file hosting
server.use(express.static(path.join(__dirname, './page')))
// Interface for uploading slices
server.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        let filename = fields.filename[0]
        let hash = fields.hash[0]
        let chunk = files.chunk[0]
        let dir = `${STATIC_TEMPORARY}/${filename}`
        // console.log(filename, hash, chunk)
        try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)
            const buffer = fs.readFileSync(chunk.path)
            const ws = fs.createWriteStream(`${dir}/${hash}`)
            ws.write(buffer)
            ws.close()
            res.send(`${filename}-${hash} Section uploaded successfully`)
        } catch (error) {
            console.error(error)
            res.status(500).send(`${filename}-${hash} Section uploading failed`)
        }
    })
})

//Merged slice interface
server.get('/merge', async (req, res) => {
    const { filename } = req.query
    try {
        let len = 0
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map((hash,index) => {
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${index}`)
            len += buffer.length
            return buffer
        });
        //Merge files
        const buffer = Buffer.concat(bufferList, len);
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`)
        ws.write(buffer);
        ws.close();
        res.send(`Section merge completed`);
    } catch (error) {
        console.error(error);
    }
})

// 检测断点
server.get('/checkpoint', (req, res) => {
    const { filename } = req.query;
    const dir = `${STATIC_TEMPORARY}/${filename}`;
    try {
      if (!fs.existsSync(dir)) {
        res.send({ success: true, point: 0, hash: 0 });
      } else {
        let len = 0;
        let hash = 0;
        fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).forEach((item, index) => {
          const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${index}`);
          len += buffer.length;
          hash += 1;
        });
        return res.send({ success: true, point: len, hash: hash - 1 });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, msg: error });
    }
  });

server.listen(3500, _ => {
    console.log('http://localhost:3500/')
})

// https://segmentfault.com/a/1190000042224419