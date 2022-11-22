const express = require('express');
const router = express.Router();

router.route('/cricketers').get((request,response)=>{
    response.send("We are team india using get");
}).post((request,response)=>{
    response.send("We are team india using post");
});

router.route('/cricketers/dhoni').get((request,response)=>{
    response.send("Hi, I am Dhoni from team india");
}).post((request,response)=>{
    response.send("Dhoni, plays well!!!");
});

router.route('/cricketers/kohli').get((request,response)=>{
    response.send("Hi, I am kohli from team india.");
}).post((request,response)=>{
    response.send("Kohli, plays well!!!");
});

router.route('/cricketers/pandya').get((request,response)=>{
    response.send("Hi, I am pandya from team india.");
}).post((request,response)=>{
    response.send("pandya, plays well!!!");
});

module.exports = router;