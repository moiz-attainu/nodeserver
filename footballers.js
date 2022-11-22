const express = require('express');
const router = express.Router();

router.route('/footballers').get((request,response)=>{
    response.send("We are football team india using get");
}).post((request,response)=>{
    response.send("We are football team india using post");
});

router.route('/footballers/chetri').get((request,response)=>{
    response.send("Hi, I am Sunil chetri from team india");
}).post((request,response)=>{
    response.send("Sunil, plays well!!!");
});

module.exports = router;