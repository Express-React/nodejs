require('dotenv').config();

module.exports = {
    secret: process.env.SECRET,
    tokenError : "Error in token",
    tokenNotPresent : "Token not present supply token",
    success : "success",
    jwtExpiry: '24h',
    dump: true
  };
  