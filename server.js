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





    res.render('index', { text: 'こんにちは' });

});


app.get("/source/menu.html", (req, res) => {
    res.sendFile(__dirname + "/views/source/menu.html");
  });

app.get("/top.html", (req, res) => {
    res.sendFile(__dirname + "/views/top.html");
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
    console.log('started uploading path')

    const textData = req.body.text; // テキストデータはreq.body.textでアクセスできる

    console.log(textData);



    var request = require("request");
    var fs = require("fs");

    var image_file = fs.createReadStream(path.join(__dirname, 'uploads/for-abe-hiroshi.jpg'))

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

        // JSON文字列をJavaScriptオブジェクトに変換
        const responseObj = JSON.parse(response.body);

        // "image" プロパティの値を取得
        const imageUrl = responseObj.data.image;

        console.log(imageUrl);

        // res.render('top', { imageUrl: imageUrl, name_jap: textData });
        res.render('top', { name: textData, imageUrl: imageUrl });

    });




});



