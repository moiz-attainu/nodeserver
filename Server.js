const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const serverPort = 6677;


app.set("views", "./views");
app.set("view engine", "ejs");

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(serverPort, (error)=>{
    if(!error)
    {
        console.log("Server is started at :  "+serverPort);
    }
    else
    {
        console.log("Server encountered an error : "+error+", while starting.");
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
