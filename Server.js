var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var serverPort = 8020;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get('/', (request, response)=>{
    console.log("got get on universal route.");
    response.render('loginForm');
});

// xwww-
app.use(bodyParser.urlencoded({extended : true}));

app.use(upload.array());

app.post('/',function(request,response){
    console.log(request.body);
    response.send("Recieved Post Request.");
});

app.listen(serverPort, (error)=>{
    if(!error)
    {
        console.log("Server is started at : "+serverPort);
    }
    else
    {
        console.log("Server encountered an error : "+error+", while starting.");
    }
});