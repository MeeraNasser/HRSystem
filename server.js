// server.js

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const benefitsRoute = require('./routes/benefitsRoute');
const departmentRoute = require('./routes/departmentRoutes');
const chatRoute = require('./routes/chatRoutes');
logger = require('morgan');
const passport = require('passport');
const chalk = require('chalk');
socketEvents = require('./socketEvents');
// require('dotenv').config();
require('dotenv').config({path: __dirname + '/.env'});

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
// dotenv.load({
//     path: '.env'
//   });

const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(logger('dev')); // Log requests to API using morgan
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.config')(passport)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth, Authorization')
    next()
  })

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});
// app.use(authMiddleware);

app.use('/user', userRoutes);
app.use('/department', departmentRoute);
app.use('/benefits', benefitsRoute);
app.use('/chatUser', chatRoute);


app.listen(PORT, function() {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), PORT, app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

// const io = require('socket.io').listen(app);

// socketEvents(io);

module.exports = app;