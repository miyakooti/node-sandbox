const express = require("express");
const axios = require('axios');

const app = express();

const request = require('request');
const fs = require('fs');


app.use(express.static("public"));
// app.use(logger);

// expressで用意されているテンプレートエンジン
app.set("view engine", "ejs");

app.get('/', async (req, res) => {

    console.log('started root path')


    var request = require("request");
    var fs = require("fs");

    var image_file = fs.createReadStream(path.join(__dirname, 'uploads/1700030491687.jpg'))

    console.log(image_file)

    request({
        method: "POST",
        url: "https://techhk.aoscdn.com/api/tasks/visual/segmentation",
        headers: {
        "X-API-KEY": "wx9sjlg1796km3kfm"
        },
        formData: {
        sync: "1",
        image_file: image_file,
        }
    }, function (error, response) {
        console.log('function now')
        if (error) throw new Error(error);
        console.log(response.body);
    });



    res.render('index', { text: 'こんにちは' });

});

app.get('/uploads/1700030491687.jpg', (req, res) => {
    const imagePath = path.join(__dirname, 'uploads', '1700030491687.jpg');
    res.sendFile(imagePath);
    res.setHeader('Content-Type', 'image/jpeg');
  });

async function makeApiRequest() {
    const imagePath = path.join(__dirname, 'views', 'source', 'ore.jpg');
    const imageContent = fs.readFileSync(imagePath);
    const API_KEY = 'wx9sjlg1796km3kfm';

    // axiosを使用して非同期にAPIリクエストを行う
    const response = await axios.post('/uploads/1700030491687.jpg', imageContent, {
        headers: {
            'Content-Type': 'image/jpeg',
            'X-API-KEY': API_KEY,
        },
        params: {
            sync: '1',
        },
    });

    return response.data;
}

app.get("/source/menu.html", (req, res) => {
    res.sendFile(__dirname + "/views/source/menu.html");
  });

app.get("/source/top.html", (req, res) => {
    res.sendFile(__dirname + "/views/source/top.html");
  });

app.listen(3000, console.log("サーバーが起動しました"));





const multer = require('multer'); // ファイルアップロードのためのミドルウェア
const path = require('path');


// ファイル保存先の設定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: (req, file, cb) => {
        const fixedFileName = 'for-abe-hiroshi.jpg'; // Use a fixed file name
        cb(null, fixedFileName);
    },
});


const upload = multer({ storage });

// アップロードされた画像を保存するエンドポイント
app.post('/upload', upload.single('image'), (req, res) => {
    // ファイルがアップロードされた後の処理
    res.send('File uploaded!');
});



