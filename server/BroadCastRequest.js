// var app = require("express")();

// app.get("/BroadCastRequest", function(req, res, next){
// 		res.send(res);
// }); 

// app.post("/BroadCastRequest", function(req, res, next){
// 	var booking =req.body.tripData;
// 	var io = req.app.io;
// 	if(res.status(400)){
// 		console.log("bad dta");
// 	}	
// 	else{
// 		res.json(booking);
// 		io.emit("driverRequest", booking);
// 		console.log("data has been broadcasted");
// 	}

// });
