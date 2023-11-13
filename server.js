const express = require("express");
const app = express();

// app.use(express.static("public"));
// app.use(logger);

// expressで用意されているテンプレートエンジン
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("Hello Express");
  //res.send("<h1>Hello NodeJs</h1>");
  //res.sendStatus(500);
  //res.status(500).send("Error");
  //res.status(500).json({ msg: "エラー" });
  res.render("index", { text: "こんにちは" });
});

app.listen(3000, console.log("サーバーが起動しました"));