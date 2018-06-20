const mongoose = require("mongoose");
const User = mongoose.model("User");
const Bit = mongoose.model("Bit")
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Log in' });
}

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Reg'})
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That email is not valid.').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank.').notEmpty();
  req.checkBody('password-confirm', 'Confirmed password cannot be blank.').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name }); //linked to the name of the field on the form
  // first arg -- method  you want to make a promise, second is object you want it to bind to. this does a nice job of making callback based libs a promise
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next(); // pass to authController.login
};

exports.apiGetUsers = async (req, res) => {
  const users = await User.find({ })

  res.json(users)
}

exports.trustOrUntrustUser = async (req, res) => {
  const trustedUsers = req.user.trustedUsers.map(obj => obj.toString())
  const userIsTrusted = trustedUsers.includes(req.params.id)
  const operator = userIsTrusted ? '$pull' : '$addToSet';
  const user = await User
      .findByIdAndUpdate(req.user._id,
        { [operator]: { trustedUsers: req.params.id }},
        { new: true }
      )

  const flashText = userIsTrusted ? 'untrusted' : 'trusted';

  req.flash('success', `You have ${flashText} this user!`);

  res.redirect('back');
}
