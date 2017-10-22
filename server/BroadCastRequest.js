var express= require("express");
var router = express.Router();
router.get("/BroadCastRequest", function(req, res, next){
		var io = req.app.io;
		res.send('my bookings');
		io.emit("tracker", req);
}); 

router.post("/BroadCastRequest", function(req, res, next){
	var booking= req.body;
	res.json(booking);
	console.log(booking);
});


 // var socket = io('http://localhost:3000');
 //  socket.on('news', function (data) {
 //    console.log(data);
 //    socket.emit('my other event', { my: 'data' });
 //  });


module.exports = router;