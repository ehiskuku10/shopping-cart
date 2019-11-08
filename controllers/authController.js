const User = require('../models/User')

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Invalid E-mail or Password!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next()
  } 
  req.flash('error', 'Oop! You must first login');
  res.redirect('/login')
}

exports.isAdmin = async(req, res, next) => {
  const user = await User.findOne({
    email: req.user.email
  })
  const privileges =  user.privileges
  privileges.forEach((privilege, index) => {
    if (index === 1) {
      if (privilege === "admin"){
        return next()
      }
      else {
        req.flash('error', 'You do not have access to view this page');
        res.redirect('/login');
      }
    }
  })
}