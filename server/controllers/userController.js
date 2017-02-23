const User = require('../models/user.js');
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

module.exports = {

  login: function(req, res, next) {
    var token = jwt.sign({ username: req.body.username }, process.env.SECRET, { expiresIn: '1d' });
    res.send({ token: token })
  },

  register: function(req, res, next) {
    var newUser = User({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      email: req.body.email
    })

    newUser.save(function(err, data){
      if (err) throw err
      res.json(data)
    })
  },

  verify: function(req, res, next){
    if (req.headers.token == 'null') {
      res.json("you don't have access")
    }else{
      if (jwt.verify(req.headers.token, process.env.SECRET)) {
        next()
      }else {
        res.json("token sudah expried")
      }
    }
  }

}
