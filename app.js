var express = require("./fc-express");

var app = new express();

app.get('/', function (req, res) {
  res.end('first')
})

app.get('/', function (req, res) {
  res.end('second')
})

app.route("/route").get(function (req, res) {
  res.end("this is a route");
});

app.get("/get", function (req, res) {
  res.end("this is a get method");
});

app.listen(3000, function () {
  console.log("http://localhost:3000, 启动了");
});
