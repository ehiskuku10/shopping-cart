const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const Privilege = require('../models/Privilege');

exports.loginForm = (req, res) => {
  res.render('login', {
    title: 'Login'
  })
}

exports.getRegistrationForm = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout()
    return res.redirect('/user/register')
  }
  return res.render('register')
}

exports.registerNewUser = async (req, res) => {
  const privilege = await Privilege.findOne({
    label: "admin"
  })
  const user = new User({ 
    email: req.body.email, 
    first_name: req.body.first_name, 
    last_name: req.body.last_name,
    phone: req.body.phone, 
    privilege: privilege._id
  });
  User.register(user, req.body.password, function (err, user) { 
    if (err) {
      console.log(err)
      return res.render('register')
    } else {
        passport.authenticate('local')(req, res, function() {
          console.log(req.user)
          res.redirect('/home')
        })
    }
  })
}

