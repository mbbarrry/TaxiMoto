var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://barry:mbbarry@ds113566.mlab.com:13566/taximotoapp', ['customers']);

router.get('/customers', function(req, res, next){
   db.customers.find(function(error, data){
    if(error){
        res.send(error);
    }
    res.json(data);
   })
}); 


router.post('/customers', function(req, res){
    var body =req.body; 
    //db.drivers.ensureIndex({userName:1},{unique:true});
        db.customers.insert(body, function(err, data){
            if(err){
                res.json({
                  "error":'user already exist'
                });
                 res.send(err);
                // throw new Error(error);
                 console.log(err);
              }  
            res.json(data);
            console.log('from database',data);
        });
        db.customers.createIndex({username:1},{unique:true});
});



// var driver =({
//    fullName: req.body.fullName,
//    userName: req.body.userName,
//    password: req.body.password,
//    emailAddress: req.body.emailAddress,
//    phoneNumber: req.body.phoneNumber 

// });
// var mb='0125e';
// var hashedPassword = passwordHash.generate(mb);  
// console.log(hashedPassword);


//console.log(db);
module.exports = router;