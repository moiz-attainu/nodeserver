const express = require('express');
const router = express.Router();

let items = [
    {id: 1, title:'created 1', orderID: 1, completed: true, createdOn: new Date()},
    {id: 2, title:'created 2', orderID: 2, completed: false, createdOn: new Date()},
    {id: 3, title:'created 3', orderID: 3, completed: true, createdOn: new Date()},
    {id: 4, title:'created 4', orderID: 4, completed: false, createdOn: new Date()},
    {id: 5, title:'created 5', orderID: 5, completed: true, createdOn: new Date()}
];

router.route('/')
.get(function(request,response){
    response.status(200);
    response.json(items);
})
.post(function(request, response){
    let newID = items.length + 1;
    let newTitle = "Created "+newID;
    let newOrderID = items.length + 1;
    let isCompleted = false;

    let newItem = {
        id : newID,
        title : newTitle,
        orderID : newOrderID,
        completed : isCompleted,
        createdOn : new Date()
    };

    items.push(newItem);

    response.status(200);
    response.json(newItem);
})
.delete(function(request,response){
    items = [];
    response.status(204);
    response.send("We have deleted all the items.");
});

router.route('/:id')
.get(function(request,response){
    let found = items.find(function(item){
        return item.id === parseInt(request.params.id);
    });

    if(found)
    {
        response.status(200);
        response.json(found);
    }
    else
    {
        response.status(404);
        response.send("Item not found with ID : "+request.params.id)
    }
})
.put(function(request, response){
    let found = items.find(function(item){
        return item.id === parseInt(request.params.id);
    });

    if(found)
    {
        let updatedItem = {
            id : found.id,
            title : request.body.title,
            orderID : parseInt(request.body.orderID),
            completed : request.body.completed,
            createdOn : found.createdOn
        };
        let foundIndex = items.indexOf(found);

        console.log(foundIndex);
        items.splice(foundIndex,1,updatedItem);
        console.log(items);
        console.log(found.id);
        response.status(200);
        response.json({message : "Successfully updated the item with id : "+ found.id +" in the database."});
    }
    else
    {
        response.status(404);
        response.send("Item not found with ID : "+request.params.id)
    }
})
.delete(function(dhoni,kohli){
    let found = items.find(function(item){
        return item.id === parseInt(dhoni.params.id);
    });

    if(found)
    {
        let index = items.indexOf(found);

        items.splice(index,1);

        kohli.status(204);
        kohli.send("Successfully deleted the item with id : "+ found.id +" in the database.");
    }
    else
    {
        kohli.status(404);
        kohli.send("Item not found with ID : "+dhoni.params.id)
    }
});

module.exports = router;