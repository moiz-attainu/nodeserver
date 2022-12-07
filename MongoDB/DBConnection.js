const { request } = require("express");
const mongoose = require("mongoose");
const connectionString = "mongodb://127.0.0.1/gada_electronics"; //connection String
//mongoose.set('strictQuery', true);
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true}, function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("database started successfully.");
    }
});

const db = mongoose.connection;

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    roll_no : {
        type : String,
        required : [true, "Bhai roll no toh dede."]
    },
    name : {
        type : String,
        required : [true, "Bhai naam toh dede."]
    },
    class : {
        type : String,
        required : [false]
    },
    age : {
        type : Number,
        required : [true, "bhai ab yeh zyada hoo raa hai."],
        min : 4,
        max : 30
    },
    mobile : {
        type : Schema.Types.Mixed,
        required : [false]
    }
});

const studentModel = mongoose.model("StudentModel",studentSchema);

const student1 = new studentModel({
    roll_no : "aaaa11111", 
    name : "Moiz", 
    class : "May Batch", 
    age : 25, 
    mobile : {
        primary:"9479720110", 
        secondary : "1122334455"
    }
});


db.on("error", console.error.bind(console, "MongoDB connection Error"));