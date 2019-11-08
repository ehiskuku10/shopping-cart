const validate = (req, res, next) => {
    if (req.url === '/user/register') {
        req.sanitizeBody('first_name')
        req.checkBody('first_name', 'You must supply your first name!').notEmpty();
        req.sanitizeBody('last_name')
        req.checkBody('last_name', 'You must supply your last name!').notEmpty();
    }
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        // stop the fn from running
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { title: 'register', body: req.body, flashes: req.flash() });
        return; 
    }
    next()
}

module.exports = validate