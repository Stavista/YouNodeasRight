var express = require('express');
var app = express();

app.set('port', 5000)
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .get('/game/:id/:name', handleSingleGame)
    .get('/games', handleGameList)
    .post('/game', handleNewGame)
    .listen(app.get('port'), function() {
    console.log("Listening on port: " + app.get('port'));
})

function handleNewGame (req, res) {
    console.log('Creating New Game...');
    
    var title = req.body.title;
    console.log('The title is: ' + title);
    
    res.json({success: true});
    
    
}

function handleSingleGame(req, res) {
    var id = req.params.id;
    var name = req.params.name;
    console.log('Getting single game with id...' + id);
    console.log('Getting single game with NAME...' + name);
    
    var result = {id: id, name: name, title: 'Super Smash Bros'};
    
    res.json(result);
}

function handleGameList(req,res) {
    console.log('Getting game list');
    
    var resultList = [{id:1, title:'Oregon Trail'}, 
                     {id:2, title:'Night in the Woods'},
                     {id:3, title:'Mario Kart'}];
    res.json(resultList);
}