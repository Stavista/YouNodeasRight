var express = require('express');
var app = express();

var bpmController = require('./controllers/10C-bpm.js'); 
//var pg = require("pg"); //Postgres
//const connectionString = "postgres://temp:pass@localhost:5000/businessList";

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + "/public"));

//Gets (requests)
app.get('/businessList', bpmController.handleBusinessList); //List of Businesses
app.get('/assets/:id', bpmController.handleAssets); //assets for specified business
app.get('/liabilities/:id', bpmController.handleLiabilities); //liabilities for specified business
app.get('/summary/:id', bpmController.handleSummary); //business summary for specified business
app.get('/dataLog/:id', bpmController.handleDataLog); //data log for specified business

//Post
app.post('/updateAssets/:id/:date/:c_e/:a_r/:inv/:other', bpmController.sendAssets);
app.post('/updateLiabilities/:id/:date/:a_p/:debt/:lto/:leases/:other', bpmController.sendLiabilities);


app.listen(app.get('port'), function() {
	console.log("Now listening on port " + app.get('port'));
});