var app = require('express')();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io').listen(server, {pingTimeout: 30000});
var bodyParser = require("body-parser");
var feedbacks = require('./routes/feedbacks');
var users = require('./routes/users');
var trips = require('./routes/trips');


console.log("server running on", port);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//Routes
app.use('/api', feedbacks);
app.use('/api', users);
app.use('/api', trips);

//socket.io connection
io.on('connection', function (socket) {
      	console.log('user connected', socket.id);
        socket.on('disconnect', function(){
        console.log('user disconnected');
       });

      // receive and emitting trip request
      socket.on('request', (data)=>{
          	console.log('from client');
            io.emit('triprequest',{data});
          	console.log('sever emitiing request');
      });

      //receiving and emitting trip request response from driver to custmer
      socket.on('response', (data)=>{
      	  io.emit('request accepted', data);
          console.log('server emitiing the response along with driver data', data);
      });

      //emit trip completed to customer
      socket.on('tripcompleted', (data)=>{
          io.emit('givefeeback', data);
          console.log(' prompting customer to feedbacks...');
      });

      //emit to cancel trip request
      socket.on('cancel', ()=>{
          io.emit('tripcanceled');
          console.log('trip canceled emitiing');
      });


      socket.on('driverIshere', (data)=>{
          io.emit('driverArrived at pic', data);
          console.log('driverArrived', data);
      });

});

server.listen(port);