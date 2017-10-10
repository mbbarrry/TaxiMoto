
var app = require('express')();
var io = require('socket.io')();
var port = 3000;
var bodyParser = require("body-parser");
var BroadCastRequest= require("./BroadCastRequest");





app.post('/', function(req, res){
	var data= req.body;
	res.json(data);
	console.log(data);
}); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/api', BroadCastRequest);

io.listen(
	app.listen(port, function(){
	console.log("Server running on port", port);
})
);


 app.io = io.on('connection', function (socket) {
 		console.log("socket connected:" +socket.id);  
 });
      
