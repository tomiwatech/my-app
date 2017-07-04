var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

users = [];
connections = [];


var routes = require('./routes/index');

//connect to mongoose
mongoose.connect('mongodb://127.0.0.1/loginapp');
var db = mongoose.connection;

// Set the view engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//public folder directory that houses all html,css and javascript
app.use(express.static(path.join(__dirname,'public')));


io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log("Connections: %s socket connected ",connections.length);

	//disconnect
	socket.on('disconnect',function(data){
	   // if(!socket.username) return;
	   users.splice(users.indexOf(socket.username),1);
	   updateUsernames();
	   connections.splice(connections.indexOf(socket),1);
	   console.log("Disconnection: %s sockets disconnected ",connections.length);
	});

    //send message
	socket.on('send_message',function(data){
		io.sockets.emit('new_message',{
			msg:data,
			user:socket.username
		});
	})

	//new user
    socket.on('new_user',function(data,callback){
    	callback(true);
    	socket.username = data;
    	users.push(socket.username);
    	updateUsernames();
    });

    function updateUsernames(){
    	io.sockets.emit('get_users',users);
    }
})


app.use('/',routes);


server.listen(process.env.PORT || 3200);
console.log('server listening on port 3200');
