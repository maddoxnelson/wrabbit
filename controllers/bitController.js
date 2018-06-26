const mongoose = require("mongoose");
const Bit = mongoose.model("Bit");
const User = mongoose.model("User");

const confirmOwner = (bit, user) => {
  if (!bit.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it.');
  }
};

exports.getPublicBits = async (req, res, next) => {
  const bits = await Bit.find({ privacy: 'world' })
  req.bits = bits
  next()
}

exports.showUserFeedBits = async (req, res, next) => {
  if (!req.user) return next()

  const user = await User.findOne( { slug: req.user.slug } )

  const allMyBits = await Bit.find(
    { author: user._id, privacy: ['trustedUsers', 'onlyMe', 'world'] }
  )

  // TODO This will show all people's public bits, but should also check if the user is one of their trusted users.
  const otherPeoplesPublicBits = await Bit.find(
    { author: { $ne: user._id }, privacy: 'world' }
  )

  // I need to know whose trustedUser objects I am in
  const usersWhoTrustMe = await User.find(
    { trustedUsers: { $all: [user._id] } }
  )

  const trustedUserArray = usersWhoTrustMe.map(user => user._id.toString())

  const trustedUserBits = await Bit.find(
    { author: trustedUserArray, privacy: 'trustedUsers' }
  )

  const bits = [...allMyBits, ...otherPeoplesPublicBits, ...trustedUserBits]

  req.bits = bits
  next()
}

exports.getUser = async (req, res, next) => {
  if (!req.user) return next()
  const user = await User.findOne({ _id: req.user.id })
  req.user = user
  next()
}

exports.bringToHomePage = async (req, res) => {
  const bits = req.bits
  const user = req.user

  if (user) {
    res.render('bits', { title: 'Welcome to Wrabbit.', bits, user });
  } else {
    res.render('bits', { title: 'Welcome to Wrabbit.', bits });
  }

}

exports.addBit = (req, res) => {
  res.render('write', { title: 'Write a Bit.' });
};

exports.editBit = async (req, res) => {
  // 1. Find the bit given the ID
  const bit = await Bit.findOne({ _id: req.params.id });
  // 2. Confirm they are the owner of the store.
  confirmOwner(bit, req.user);

  // 3. render out the edit form so user can update their bit.
  res.render('editBit', { title: `Edit "${bit.name}"`, bit })
}

exports.deleteBit = async (req, res) => {
  const bit = await Bit.deleteOne(
    { _id: req.params.id }
  ).exec()

  req.flash('success', `Deleted.</a>`);
  res.redirect(`/`)
}

exports.updateBit = async (req, res) => {

  const bit = await Bit.findOneAndUpdate(
    { _id: req.params.id }, // query
    req.body, // data
    { // options
      new: true,          // return new bit, not old bit
      runValidators: true // force our model to run required validators against this
    }
  ).exec();

  req.flash('success', `Successfully updated ${bit.name}`);
  res.redirect(`/bit/${bit.slug}`)
};

exports.checkBitPrivacySettings = async (req, res, next) => {
  const bit = await Bit.findOne({ slug: req.params.slug });

  const bitIsPublic = bit.privacy === 'world'

  if (bitIsPublic) return next()

  if (!req.user) {
    req.flash('success', `Hmmm, that bit either does not exist or you aren't authorized to read it.`);
    res.redirect(`/`)
  } else {
    const user = await User.findOne({ _id: req.user._id })
    const trustedUserString = bit.author.trustedUsers.map(obj => obj.toString())

    const readerIsATrustedUser = trustedUserString.includes(user.id)
    const readerIsTheUser = user.id === bit.author.id

    if (readerIsTheUser || readerIsATrustedUser) {
      return next()
    }
  }

}

exports.getBitBySlug = async (req, res, next) => {
  const bit = await Bit.findOne({ slug: req.params.slug });

  if (!bit) return next();

  res.render('bit', { title: `${bit.name}`, bit })
}

exports.createBit = async (req, res) => {
  // TODO carry through bit bits to give users a second chance to finish
  req.body.author = req.user._id;
  const bit = await (new Bit(req.body)).save();
  req.flash('success', `Successfully created ${bit.name}!`);
  res.redirect(`/bit/${bit.slug}`);
};

exports.showBitsByGenre = async (req, res) => {
  const genre = req.params.genre;
  const bits = await Bit.find({ genre: genre });
  res.render('bits', { title: `${genre} bits`, bits})
}

exports.getBitsByAuthor = async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug });
  // TODO if I am considered a trustedUser to this author, show me all their not Only Me bits
  const bits = await Bit.find(
    { author: user._id, privacy: 'world' }
  )

  req.user = user;
  req.bits = bits

  res.render('author', { title: 'Author page', user, bits });

}

// TODO shrink the output of this API to just produce the bare minimum -- Bit title and ID, I think
exports.getJSONBitsByAuthor = async ( req, res ) => {
  const user = await User.findOne(
    { slug: req.params.slug }
  )
  if (!user) res.redirect('/')

  const bits = await Bit.find(
    { author: user._id },
    { name: 1 }
  )

  if (user._id.toString() === req.user._id.toString()) {
    res.json(bits)
  } else {
    res.redirect('/')
  }
}

exports.apiGetSingleBit = async (req, res) => {
  const bit = await Bit.find({ _id: req.params.id })

  res.json(bit)
}
