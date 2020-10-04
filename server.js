var cors = require('cors')
var app = require('express')();
var http = require('http').Server(app);
var morgan = require('morgan')
var userRouter = require('./routes/users');
var flightRouter = require('./routes/flights');
var passport   = require('passport');
var session    = require('express-session');
var appRoute = require('./routes/main.js');
const helmet = require('helmet');

app.use(cors())
app.use(helmet.frameguard({ action: 'sameorigin' }));
require('dotenv').config();

// Instantiating the app 
app.use(morgan('tiny'))
app.use('/user', userRouter);
app.use('/flight', flightRouter);
app.use('/', appRoute);

// For passport
app.use(session({ secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

const logger = require('./utilities/logger');
// ==================================================================================== //
module.exports = app;
http.listen(process.env.PORT, () =>  {
    logger.winston.info('listening on *:' + process.env.PORT);
});
