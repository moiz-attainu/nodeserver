var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

app.get('/', (request, response)=>{
    response.render('loginForm');
});

// xwww-
app.use(bodyParser.urlencoded({extended : true}));

app.use(upload.array());

app.post('/',function(request,response){
    console.log(request.body);
    response.send("Recieved Post Request.");
});