
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports  = { 

    generateHash :  (password, callback) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                callback(hash);
            });
        });
    },

    compareHash :  (password, hash, callback) => {
        bcrypt.compare(password , hash).then((result) => {
            callback(result);
        });
    }
}