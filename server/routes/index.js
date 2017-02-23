var express = require('express');
var router = express.Router();
var passport = require('passport');
var userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',passport.authenticate('didit-login'), userController.login);

router.post('/register', userController.register);


module.exports = router;
