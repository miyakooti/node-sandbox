const express = require("express");
const app = express();

// const request = require('request');
const fs = require('fs');

// app.use(express.static("public"));
// app.use(logger);

// expressで用意されているテンプレートエンジン
app.set("view engine", "ejs");

app.get('/', (req, res) => {

    // try {
    //   const apiResponse = makeSyncApiRequest();
  
    //   console.log(apiResponse);
  
    //   res.render('index', { text: 'こんにちは' });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('Internal Server Error');
    // }

    res.render('index', { text: 'こんにちは' });

    
  });


// 同期でAPIリクエストを行う関数
function makeSyncApiRequest() {
    const imagePath = '/views/source/ore.jpg';
  
    // 画像を同期的に読み込む
    const imageContent = fs.readFileSync(imagePath);

    const API_KEY = "wx9sjlg1796km3kfm";
  
    // 同期的にAPIリクエストを行う
    const apiResponse = request.sync({
      method: 'POST',
      url: 'https://techhk.aoscdn.com/api/tasks/visual/segmentation',
      headers: {
        'X-API-KEY': API_KEY
      },
      formData: {
        sync: '1',
        image_file: imageContent,
      }
    });
  
    return JSON.parse(apiResponse.body);
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
        cb(null, 'uploads/'); // 保存先のディレクトリを指定
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`); // ファイル名を一意にする
    },
});

const upload = multer({ storage });

// アップロードされた画像を保存するエンドポイント
app.post('/upload', upload.single('image'), (req, res) => {
    // ファイルがアップロードされた後の処理
    res.send('File uploaded!');
});