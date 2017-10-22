var app = require('express')();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");
var BroadCastRequest= require("./BroadCastRequest");

console.log("server running on", port);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api', BroadCastRequest);

io.on('connection', function (socket) {
    console.log("socket connected", socket.id);
    io.emit('hello message', { hello: 'world' });
    
    socket.on('ms', function (from) {
    	console.log('i received this', from);
    	socket.emit('ms', {msg: 'welcome user1'});
  	});
  	socket.on('driver', function (e) {
  		console.log('msg from driver', e)
  	});
    socket.on('disconnect', function(){
      socket.emit('user disconnected');
    });
  
  });


// var WebSocket = require('ws');
// const wss = new WebSocket.Server({ server });
// wss.on('connection', (ws) => {
// 	console.log('new connection');
//     //connection is up, let's add a simple simple event
//     ws.on('message', (message) => {

//         //log the received message and send it back to the client
//         console.log('received: %s', message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });

//     //send immediatly a feedback to the incoming connection    
//     ws.send('Hi there, I am a WebSocket server');
// });

server.listen(port);