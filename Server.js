const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverPort = 6677;
const itemsRouter = require('./items');
app.use(express.json());
app.use('/items',itemsRouter);
app.use(bodyParser.urlencoded({extended : true}));

app.route('/').get(function(request,response){
    response.status(200);
    response.send("got a get request on universal route.");
}).post(function(request,response){
    response.status(200);
    response.send("got a post request on universal route.");
});


app.listen(serverPort, function(error){
    if(error)
    {
        console.log("Server did not start because of :"+error);
    }
    else
    {
        console.log("Server has started and is listening at port : "+serverPort);
    }
});


app.post('/upload', function(request, response){
    console.log(request.files);
    if(request.files && Object.keys(request.files).length != 0)
    {
        const uploadFile = request.files.uploadFile;
        console.log(uploadFile);
        const uploadPath = "./uploads/" + uploadFile.name;
        uploadFile.mv(uploadPath, function(error){
            if(error)
            {
                console.log(error);
                response.status(500);
                response.send("Failed to upload File because : "+error);
            }
            else
            {
                console.log("File uploaded successfully to : "+uploadPath);
                response.status(200);
                response.send("File uploaded Successfully");
            }
        });
    } else
    {
        console.log("No file uploaded!!!");
        response.status(500);
        response.send("No Files Uploaded.");
    }
});

app.get('/download', function(request,response){
    console.log(request.body);
    const filename = request.body;
    response.download("./uploads/"+filename, function(error){
        if(error)
        {
            console.log(error);
        }
    });
});

app.get('/uploadForm', (request, response)=>{
    console.log("request for upload Form.");
    response.render('uploadForm');
});
