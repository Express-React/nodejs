/**
 * Devices api
 */
var table = require('./db');

module.exports = {
    //login deviceslop
    login : function( req, responseCallback){
  
        table.User.find({
            where: {
                name: req.body.name, password:  req.body.password
            }
            }).then(function(device) {
            if (!device) 
                responseCallback("","error");
            else{
                let data  = {"name":device['name'],"id":device['id']}
                responseCallback(data, "success");
            }
                
        });
    },

    signin : function( req, responseCallback){
  
        table.User.find({
            where: {
                name: req.body.name
            }
            }).then(function(device) {
            if (!device) 
                responseCallback("","error");
            else
                responseCallback(device, "success");
        });
    },
    
    newUser : function( req, responseCallback){
  
        table.User.find({
            where: {
                name: req.body.name, password:  req.body.password
            }
            }).then(function(device) {
            if (!device) 
                responseCallback("","error");
            else
                responseCallback(device, "success");
        });
    },

    add:  function( name, password, responseCallback){
        table.User.create( { name: name, 
            password: password, last_login : new Date()
        })
            .then((res) => {
                responseCallback("success");
          }); 
          
    },

    list:  function(responseCallback){
        table.User.findAll().then((data) => {
            responseCallback(data)
          });
    },
 
    update:  function(oDevice, responseCallback){
        table.User.update( { name: oDevice["body"]["name"], 
            password: oDevice["body"]["password"], 
            uuid: oDevice["body"]["uuid"] }, 
            { where: {id:  oDevice["body"]["id"]} }
          ).then(() => {
            responseCallback(("success"))
          });        
    },
    updateLogin:  function(name, responseCallback){
        table.User.update( { 
            last_login : new Date() }, 
            { where: {name:  name} }
          ).then(() => {
            responseCallback(("success"))
          });        
    },

    remove : function(req, responseCallback){
        table.User.destroy({
            where: { id: req.id }
        }).then(() => {
            responseCallback('deleted successfully a customer  ');
        });
    } 
}