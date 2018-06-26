const mongoose = require("mongoose");
const Bit = mongoose.model("Bit");
const User = mongoose.model("User");

exports.getMyOnlyMeBits = async (req, res, next) => {
  const bits = await Bit.find({ author: req.user._id, privacy: 'onlyMe' })
  req.onlyMeBits = bits
  next()
}

exports.getMyTrustedUserBits = async (req, res, next) => {
  const bits = await Bit.find({ author: req.user._id, privacy: 'trustedUsers' })
  req.trustedUserBits = bits
  next()
}

exports.getMyPublicBits = async (req, res, next) => {
  const bits = await Bit.find({ author: req.user._id, privacy: 'world' })
  req.publicBits = bits
  next()
}

exports.directToPrivacyPage = async (req, res, next) => {
  const { onlyMeBits, trustedUserBits, publicBits } = req

  res.render('privateBits', { title: "Bits sorted by privacy", onlyMeBits, trustedUserBits, publicBits })
}
