// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express');
const path = require('path');
const request = require('request');

// CORS 때문에 추가한 부분 //
const cors = require('cors');


// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

app.use(cors({origin: 'http://localhost:8080'}));

app.use(express.static(path.join(__dirname, 'public')));

// 3000 포트로 서버 오픈
app.listen(8080, function (req, res) {
  console.log("start! express server on port 8080");
});

app.get('/',  function (req, res) {
  res.sendfile(__dirname + "/public/index.html");
  res.header("Access-Control-Allow-Origin", "*");
  
});

// app.get('/index', function(req,res){
//   res.sendfile(__dirname+"/public/index.html");
// });

// app.get('/geolocation', function(req,res){
//   res.sendfile(__dirname+"/public/geolocation.html");
// });