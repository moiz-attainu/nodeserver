const express = require('express');
const router = express.Router();

router.route('/cricketers').get((request,response)=>{
    var numberOfPlayers = request.query['players'];
    response.send("We are team india with "+numberOfPlayers+" players.");
}).post((request,response)=>{
    response.send("We are team india using post");
});

router.route('/cricketers/dhoni/:age').get((request,response)=>{
    var age = request.params['age'];
    response.send("Hi, I am Dhoni from team india, with age : "+age);
}).post((request,response)=>{
    response.send("Dhoni, plays well!!!");
});

module.exports = router;