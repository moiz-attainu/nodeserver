const express = require('express');
const fs = require('fs');
const rahulGandhi = express();

const rahulsPort = 7777;


rahulGandhi.get('/upload', (request, response)=> {
var data = request.query.imageData;
console.log(data);
var buff = new Buffer(data, 'base64');
fs.writeFileSync('tryImage.jpg', buff);
response.send("Rahul is listening on :"+rahulsPort+" , he is a good boy.");
});

rahulGandhi.listen(rahulsPort, (error)=>{
if(!error)
	console.log("Server is started like brooom brooom !!!! on port : "+rahulsPort);
else
	console.log("Rahul is a bad boy, he is not listening.");
});
