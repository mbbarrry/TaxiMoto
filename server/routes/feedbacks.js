var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://barry:mbbarry@ds113566.mlab.com:13566/taximotoapp', ['feedbacks']);

router.get('/feedbacks', function(req, res, next){
   db.feedbacks.find(function(error, data){
    if(error){
        res.send(error);
    }
    res.json(data);
   })
}); 


router.post('/feedbacks', function(req, res){
       var body =req.body; 
        db.feedbacks.save(body, function(error, data){
            if(error){
                console.log('feedback failed to saved in the database',error)
                res.send(error);
              }  
              console.log('feedback successfully saved in the database');
            res.send('the data is been saved successfully');
        });
});


module.exports = router;