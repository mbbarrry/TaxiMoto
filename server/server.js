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
	console.log('user connected', socket.id);
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('request', (data)=>{
    	console.log('from client',data);
    	io.emit('triprequest',{data});
    	console.log('sever emitiing:',data);

    });
});
server.listen(port);