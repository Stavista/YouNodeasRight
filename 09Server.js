const express = require('express');

var app = express();
var letterEngine = require('./09LetterEngine.js');
app.set('port', process.env.PORT || 5000)
    .use(express.static(__dirname + "/public"))
.set('views', __dirname + "/views")
.set('view engine', 'ejs')
    .get("/letter", letterEngine.calculate)
    .listen(app.get('port'), function() {
    console.log("Listening on port: " + app.get('port'))
});
         
