var express = require('express');
var router = express.Router();
const passport = require('passport');
const ChatController = require('../controllers/ChatController');

// To Check and verify the token if exist 
router.use(passport.authenticate('jwt', { session : false }))

router.get('/getUserMessages', ChatController.getAllMessages);

module.exports = router;
