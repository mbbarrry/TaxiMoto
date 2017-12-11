var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var db = mongojs('mongodb://barry:mbbarry@ds113566.mlab.com:13566/taximotoapp', ['users']);
router.get('/users', function(req, res, next){
   db.users.find(function(error, data){
    if(error){
        res.send(error);
    }
    res.json(data);
   })
}); 


// signup endpoint
router.post('/users', function(req, res){
      db.users.findOne({userName: req.body.userName}, (result, data)=>{
        if (data && data._id) {
          res.json({error:'user already exists'});
          //console.log('data of existing user',data);
        }
        else{
         db.users.insert(req.body, function(error, data){
            if(error){
                 res.json({dbError:'signup failed, please try again!'});
                 //console.log('error coming from db',error);
              }
              else{  
            res.json({dbError: null});
            //console.log('data is successfully saved',data);
          }
        });
        db.drivers.createIndex({userName:1},{unique:true});
      }
});
});      

//login endpoint
router.post('/login', function(req, res){

  db.users.findOne({userName:req.body.userName, password:req.body.password, isDriver:req.body.isDriver}, (result, data)=>{
     if(data && data._id){
        res.json({error: null, loggedIn: true, data});
        //console.log(data);
      }
    else {
          //console.log(result);
           res.json({error:'user not found or wrong password', loggedIn: false});
        }
     });
});


module.exports = router;