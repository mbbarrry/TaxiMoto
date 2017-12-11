var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://barry:mbbarry@ds113566.mlab.com:13566/taximotoapp', ['trips']);

router.get('/trips', function(req, res){
   db.trips.find(function(error, data){
    if(error){
        res.send(error);
    }
    res.json(data);
   })
}); 

router.post('/trips', function(req, res){ 
        db.trips.save(req.body, function(error, data){
            if(error){
              console.log(error);
                res.send(error);
              }  
            res.send(data);
            console.log('trip successfully saved in the database');
        });
});


module.exports = router;