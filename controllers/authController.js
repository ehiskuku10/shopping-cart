const User = require('../models/User')
const passport = require('passport')

exports.login = passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: 'Invalid E-mail or Password!',
  successRedirect: '/home',
  successFlash: 'You are now logged in!'
})

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋');
  res.redirect('/user/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next()
  } 
  req.flash('error', 'Oop! You must be logged in');
  res.redirect('/user/login')
}

exports.isAdmin = async(req, res, next) => {
  const user = await User.findOne({
    email: req.user.email
  }).populate('privilege')

  if (user.privilege.label === "admin"){
    return next()
  }
  else {
    req.flash('error', 'You do not have access to view this page')
    res.redirect('/user/login')
    return
  }
}