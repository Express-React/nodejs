/**
 * Users api
 */
var table = require('./db');

module.exports = {
    login : function( req, responseCallback){
  
        table.User.find({
            where: {
                name: req.body.name, password:  req.body.password
            }
            }).then(function(users) {
            if (!users) 
                responseCallback("","error");
            else{
                let data  = {"name":users['name'],"id":users['id']}
                responseCallback(data, "success");
            }
                
        });
    },

    signin : function( req, responseCallback){
  
        table.User.find({
            where: {
                name: req.body.name
            }
            }).then(function(users) {
            if (!users) 
                responseCallback("","error");
            else
                responseCallback(users, "success");
        });
    },
    
    newUser : function( req, responseCallback){
  
        table.User.find({
            where: {
                name: req.body.name, password:  req.body.password
            }
            }).then(function(users) {
            if (!users) 
                responseCallback("","error");
            else
                responseCallback(users, "success");
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
        table.User.findAll({
            attributes: ['id', 'name','status','last_login'],
        }).then((data) => {
            responseCallback(data)
          });
    },
 
    update:  function(oUsers , responseCallback){
        table.User.update( { name: oUsers ["body"]["name"], 
            password: oUsers ["body"]["password"], 
             }, 
            { where: {id:  oUsers ["body"]["id"]} }
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
        }).then((err, res) => {
            let str="deleted successfully"
            if(err != "1"){
                str = 'Requested data not found';
            }
            responseCallback(str);
        });
    } 
}