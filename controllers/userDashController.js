const mongoose = require("mongoose");

exports.showUserDash = (req, res) => {
  const user = req.user;
  const bits = req.bits;

  res.render('author', { title: 'Author page', user, bits });
}
