// set up
var express = require('express');
var cookieParser  = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var instagram = require('./instagram');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cors({origin: 'http://explore-instagram.cbales-portfolio.com'}));
app.use(cookieParser());

app.use('/', instagram);

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

app.listen(3000);
console.log("App listening on port 3000");