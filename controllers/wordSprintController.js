const mongoose = require("mongoose");
const Bit = mongoose.model("Bit");
const User = mongoose.model("User");

exports.chooseSprintMode = (req, res) => {
  res.render('sprint', { title: 'Choose a mode.' })
}

exports.displayMode = (req, res) => {
  const mode = req.params.mode;

  res.render(`sprints/${req.params.mode}`, { title: `Word Sprint: Write to ${mode}!` })
}
