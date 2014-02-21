
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hi', function(req,res){
	res.send('Welcome');
});
app.get('/goodbye', function(req, res){
	res.send('And I say hello!!');
});
app.get('/why', function(req,res){
	res.send('Because!!')
});
app.get('/form', function(req,res){
	fs.readFile('index.html', function(err, data){
		if(err){
			throw err;
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	});
});
app.post('/formsubmit', function(req, res) {
    res.redirect('/success');
});
app.get('/success', function(req,res){
	res.send('Success!!');

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
