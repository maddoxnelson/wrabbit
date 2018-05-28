const mongoose = require("mongoose");
const Bit = mongoose.model("Bit");
const User = mongoose.model("User");

const confirmOwner = (bit, user) => {
  if (!bit.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it.');
  }
};

exports.getBits = async (req, res) => {
  const bits = await Bit.find();

  res.render('bits', { title: 'Welcome to Wrabbit!', bits });
};

exports.addBit = (req, res) => {
  res.render('write', { title: 'Write a Bit.' });
};

exports.editBit = async (req, res) => {
  // 1. Find the bit given the ID
  const bit = await Bit.findOne({ _id: req.params.id });
  // 2. Confirm they are the owner of the store.
  confirmOwner(bit, req.user);

  // 3. render out the edit form so user can update their bit.
  res.render('editBit', { title: `Edit ${bit.name}`, bit })
}

exports.updateBit = async (req, res) => {
  console.log(req.params.id)

  const bit1 = await Bit.findOne({ _id: req.params.id })

  console.log(req.body)

  const bit = await Bit.findOneAndUpdate(
    { _id: req.params.id }, // query
    req.body, // data
    { // options
      new: true,          // return new bit, not old bit
      runValidators: true // force our model to run required validators against this
    }
  ).exec();

  //console.log(bit)

  req.flash('success', `Successfully updated ${bit.name}.<a href="/bit/${bit.slug}">View bit -></a>`);
  res.redirect(`/bits/${bit._id}/edit`)
  // redirect them the store and tell them it worked
};

exports.getBitBySlug = async (req, res, next) => {
  const bit = await Bit.findOne({ slug: req.params.slug });

  if (!bit) return next();
  res.render('bit', { title: `${bit.name}`, bit })
}

exports.createBit = async (req, res) => {
  // TODO carry through bit bits to give users a second chance to finish
  req.body.author = req.user._id;
  const bit = await (new Bit(req.body)).save();
  req.flash('success', `Successfully created ${bit.title}!`);
  res.redirect(`/bit/${bit.slug}`);
};

exports.showBitsByGenre = async (req, res) => {
  const genre = req.params.genre;
  const bits = await Bit.find({ genre: genre });
  res.render('bits', { title: `${genre} bits`, bits})
}

exports.getBitsByAuthor = async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug });
  const bits = await Bit.find({ author: user._id })

  req.user = user;
  req.bits = bits

  next();

}
