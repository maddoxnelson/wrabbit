const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require("../handlers/mail");

exports.login = passport.authenticate('local');

exports.directToScreen = (req, res) => {
  res.redirect(`/author/${req.user.slug}`);
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out.');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.loggedIn = true
    next();
    return;
  }
  req.loggedIn = false
  next()
}

exports.requiredLogin = (req, res, next) => {
  // first check if user authenticated
  if(req.isAuthenticated()) {
    next(); // carry on, they good
    return;
  }
  req.flash('error', 'Oops, you must be logged in.');
  res.redirect('/login');
};

exports.forgot = async (req, res) => {
  // see if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'No account with that email exists.');
    return res.redirect('/login');
  }

  // if there is a user, set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();

  // send them email with a token
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;

  await mail.send({
    user,
    subject: 'Password reset',
    resetURL,
    filename: 'password-reset'
  });

  req.flash('success', `You have been emailed a password reset link.`);

  // redirect to login page after token sent
  res.redirect('/login');
};

exports.findUser = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired.');
    return res.redirect('/login');
  }
  req.user = user;
  next();
};

exports.reset = (req, res) => {
  // if there is a user show reset password form
  res.render('reset', { title: 'Reset your password.'});
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body["confirm-password"]) {
    next();
    return;
  }
  req.flash('error', 'Passwords do not match!');
  res.redirect('back');
};

exports.update = async (req, res) => {
  const user = req.user;
  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash('success', 'Nice! Password reset!');
  res.redirect('/');
};
