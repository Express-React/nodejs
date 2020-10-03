let jwt = require('jsonwebtoken');
const config = require('./config');

/**
 * 
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - callback, goes to the next step
 */
let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json(401,{
          success: false,
          message: config.tokenError
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json(401,{
      success: false,
      message: config.tokenNotPresent
    });
  }
};

module.exports = {
  checkToken: checkToken
};
