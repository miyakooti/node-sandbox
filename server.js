const express = require("express");
const axios = require('axios');

const app = express();

const request = require('request');
const fs = require('fs');

const OpenAI = require('openai');
require('dotenv').config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
   });

async function example() {
        const openapi = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        })
        const drama = await openai.sendMessage('阿部寛が出演した日本ドラマ2つ、名前だけください')
        console.log(drama.text)
    }
   
app.get('/sample', async (req, res) => {
    example()
    res.render('index', { text: 'こんにちは' });
});


app.set("view engine", "ejs");


app.get('/', async (req, res) => {
    res.render('index', { text: 'こんにちは' });
});


app.get("/menu.html", (req, res) => {
    res.sendFile(__dirname + "/views/menu.html");
});

app.get("/top.html", (req, res) => {
    res.sendFile(__dirname + "/views/top.html");
});


const multer = require('multer');
const path = require('path');


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

//
// async function example() {
//     const api = new ChatGPTAPI({
//       apiKey: process.env.OPENAI_API_KEY,
//     })
//     const drama = await api.sendMessage('阿部寛が出演した日本ドラマ2つ、名前だけください')
//     console.log(drama.text[0])
// }
// //

app.post('/upload', upload.single('image'), (req, res) => {

    console.log('started uploading path')

    const textData = req.body.text;
    //const rname = jaconv.toHebon(textData);
    var request = require("request");
    var fs = require("fs");

    var image_file = fs.createReadStream(path.join(__dirname, 'uploads/for-abe-hiroshi.jpg'))

    console.log(image_file)

    request({
        method: "POST",
        url: "https://techhk.aoscdn.com/api/tasks/visual/segmentation",
        headers: {
            "X-API-KEY": "wx8c97vvp69s0o9ge"
        },
        formData: {
            sync: "1",
            image_file: image_file,
        }
    },function (error, response) {
        console.log('function now')
        if (error) throw new Error(error);

        // JSON文字列をJavaScriptオブジェクトに変換
        const responseObj = JSON.parse(response.body);
        const imageUrl = responseObj.data.image;

        console.log(imageUrl);

        const birth_year = Math.floor(Math.random() * ( 2000 - 1950 ) + 1950);
        const birth_month = Math.floor(Math.random() * ( 12 - 1 ) + 1);
        const birth_day = Math.floor(Math.random() * (28 - 1) + 1);

        const pick = Math.floor(Math.random() * (3- 0) + 0);
        var bloodtype = ['A', 'B', 'O', 'AB'];
        const blood = bloodtype[pick];

        // res.render('top', { imageUrl: imageUrl, name_jap: textData });
        res.render('top', {
            name: textData, 
            imageUrl: imageUrl, 
            birthyear: birth_year, 
            birthmonth:birth_month, 
            birthday:birth_day, 
            blood:blood
        });
    });
});

// app.post('/generate-text', async (req, res) => {
//     try {
//         const userInput = req.body.userInput;

//         const response = await openai.Completion.create({
//             engine: "text-davinci-003",
//             prompt: userInput,
//             max_tokens: 50
//         });

//         const generatedText = response.choices[0].text;
//         res.json({ generatedText });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// const apiKey = process.env.OPENAI_API_KEY;
// const gpt = new OpenAIAPI({ key: apiKey });

//import OpenAI from "openai";


app.listen(3000, console.log("サーバーが起動しました"));
