
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports  = { 

    generateHash :  function(password, callback) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                callback(hash);
            });
        });
    },

    compareHash :  function(password, hash, callback){
        bcrypt.compare(password , hash).then(function(result) {
            callback(result);
        });
    }
}