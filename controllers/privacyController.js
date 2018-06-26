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

// Verify that the user is the author of the bit they are attempting to modify
exports.userIsAuthorOfThisBit = async (req, res, next) => {
  const bit = await Bit.findOne({ slug: req.params.slug })
  if (req.user.id !== bit.author.id) {
    req.flash('success', `You are not authorized to change the setting on this bit.`);
    res.redirect(`/bit/${req.params.slug}`)
  }
  next()
}

exports.updateBitPrivacy = async (req, res, next) => {

  // TODO hook this up to the lock icon button on every page.
  const newPrivacySettings = {
    privacy: req.params.privacy
  }

  const bit = await Bit.findOneAndUpdate(
    { slug: req.params.slug }, // query
    newPrivacySettings,
    { // options
      new: true,          // return new bit, not old bit
      runValidators: true // force our model to run required validators against this
    }
  ).exec();

  req.flash('success', `Successfully updated ${bit.name}`);
  res.redirect(`/bit/${bit.slug}`)

}
