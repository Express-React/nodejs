var express = require('express');
var router = express.Router();
var users = require('../utilities/users');
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../middleware');
let passport = require('../utilities/pass');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

//============ Add new device ====================//
router.post("/add/", middleware.checkToken , function(req, res) {
    users.add(req.body.name, req.body.password, req.body.uuid, function(result){
        res.json({
            success : true,
            response: 'success',
        });
    });
});
//============ get all users ====================//
router.get(  "/list/", middleware.checkToken , function(req, res) {
    users.list( function(result) {
        res.json({
            success : true,
            "response": "success",
            "data": result
        });
        res.end();
    });
});
//============ update the Users details ====================//
router.post("/update/", middleware.checkToken , function(req, res) {
    users.update(req, function(result) {
        res.json({
            success : true,
            "response": "Users updated succesfully"
        });
        res.end();
    });
});

//============ login to  the Users ====================//
router.post("/login/", function(req, res) {
    var message ="error";
    var token = ""
    users.login( req, function(data, result){
        if(result == "success"){
             token = jwt.sign({name: req.body.name},
                config.secret, { expiresIn: config.jwtExpiry });
            message = "success";
            res.send({
                data: {
                    token : token,
                    response: message,
                    data: data,
                    success : true
                }
            });
        } else if (result == "error"){
            res.send({
                success : false,
                message: 'Incorrect username or password'
              });
        }
    })
});
router.post("/signin/", function(req, res) {
    var message ="error";
    var token = ""
    users.signin( req, function(data, result){
        if(result == "success"){
            passport.compareHash(req.body.password, 
                data.password,
                    function(result){
                if(result){
                    token = jwt.sign({name: req.body.name},
                        config.secret, { expiresIn: config.jwtExpiry });
                    message = "success";
                    let resData = {
                        "name":data['name'],'id':data['id'],
                        'last_login':data['last_login'],'status':data['status']
                    }
                    users.updateLogin(req.body.name, function(){})
                    res.send({
                        token : token,
                        response: message,
                        data: resData,
                        success : true
                    });
                } else{
                    res.send({
                        success : false,
                        message: 'Incorrect username or password'
                      });
                }
            })
        } 
    })
});
router.post('/signup/',  function (req, res) {

    users.signin( req, function(data, result){
        if(result == "success"){
            res.statusCode = 409
            res.send({
                success : false,
                response: 'username already exists',
            });
        } else{
            
            passport.generateHash(req.body.password, function(hash){
                users.add(req.body.name, hash, function(result){
                    res.statusCode = 201
                    res.send({
                        success : true,
                        response: 'Username successfully created',
                    });
                });
            })
        }
    })
    
   
});

router.delete("/delete/", middleware.checkToken , function(req, res) {
    users.remove(req.body, function(result) {
        res.json({
            success : true,
            "response": result
        });
        res.end();
    });
    router.post("/auth/", function(req, res) {
        var message ="error";
        var token = ""
        users.login( req, function(data, result){
            if(result == "success"){
                 token = jwt.sign({name: req.body.name},
                    config.secret, { expiresIn: config.jwtExpiry });
                message = "success";
                res.send({
                    data: {
                        token : token,
                        response: message,
                        data: data,
                        success : true
                    }
                });
            } else if (result == "error"){
                res.send({
                    success : false,
                    message: 'Incorrect username or password'
                  });
            }
        })
    });
    
});
module.exports = router;
