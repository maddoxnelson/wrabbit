const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const bitSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a Bit title.'
  },
  slug: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  },
  content: {
    type: String,
    required: 'Go on... write!'
  },
  genre: {
    type: String,
    required: 'Choose a genre.'
  },
  word_count: {
    type: Number
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bitSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    console.log('checking for modification... finding an identical one')
    return next(); // move along, don't redo the slug if name hasn't changed
  }
  this.word_count = Number(this.content.split(' ').length)

  console.log('this:', this)
  // slugifies the name
  this.slug = slug(this.name);
  // find other stores with similar slug or slug-1
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const bitsWithSlug = await this.constructor.find({ slug: slugRegex });

  if(bitsWithSlug.length) {
    this.slug = `${this.slug}-${bitsWithSlug.length + 1}`;
  }

  // moves things along to the next part
  next();

});

function autopopulate(next) {
  this.populate('author');
  next()
};

bitSchema.pre('find', autopopulate);
bitSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Bit', bitSchema);
