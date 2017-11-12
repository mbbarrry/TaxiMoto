var app = require('express')();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io').listen(server, {pingTimeout: 30000});
var bodyParser = require("body-parser");
var BroadCastRequest= require("./BroadCastRequest");

var trip_info = [];
var driver_info= [];

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

// receive and emitting trip request
socket.on('request', (data)=>{
    	console.log('from client',data);
       trip_info.push(data);
       console.log('the array', trip_info);
 io.emit('triprequest',{data});
    	console.log('sever emitiing:',data);
    });

//receiving and emitting trip request response from driver to custmer
socket.on('response', (data)=>{
	driver_info.push(data);
    var datafiltered = driver_info.filter((item)=>{
     return item.CustomerName == data.CustomerName;
   });
	
	io.emit('request accepted', data);
    console.log('server emitiing the accepted r', datafiltered);
});

socket.on('customer:connected', (data) => {
	var datafiltered = trip_info.filter((item)=>{
     return item.userName == data.userName;
   });
	if (datafiltered[0]) {
		socket.emit('trip-info', datafiltered[0]);
		console.log('customer connected on props',datafiltered);
	} else {
		console.log('no trip info found');
	}
})

});

server.listen(port);