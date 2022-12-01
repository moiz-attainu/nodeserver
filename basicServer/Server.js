const express = require('express');
const server = express();
const cricketers = require('./cricketers');
const footballers = require('./footballers');
const serverPort = 6655;

var universalRoute = server.route('/');

universalRoute.get((request,response)=>{
    console.log(request);
    response.send("This is universal route using get");
})
.post((request,response)=>{
    response.send("This is universal route using post");
});

server.use('/',cricketers);
server.use('/',footballers);



server.listen(serverPort, (error)=>{
    if(!error)
    {
        console.log("Server is started at : "+serverPort);
    }
    else
    {
        console.log("Server encountered an error : "+error+", while starting.");
    }
});