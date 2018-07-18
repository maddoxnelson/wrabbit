const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const User = mongoose.model("User");
const wordcount = require('wordcount');
import moment from 'moment';

const bitSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
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
  word_count: {
    type: Number
  },
  prompt: {
    type: String
  },
  privacy: {
    type: String,
    default: "onlyMe",
    enum: ["trustedUsers", "world", "onlyMe"],
    required: 'You need to provide privacy options'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

async function simpleResetWordCount(lastUpdated) {
  const today = moment()
  const userDate = moment(lastUpdated)
  return today.format('mm') !== userDate.format('mm')
}

async function addToUsersTotalWordCount(id, wordCount) {
  const author = await User.findOne({ _id: id});
  const dailyCount = author.stats.wordsWrittenToday.dailyWordCount
  const count = dailyCount + wordCount 
  const user = await User.findOneAndUpdate(
    { _id: id },
    { stats: {
      totalWordsWritten : author.stats.totalWordsWritten + wordCount,
      wordsWrittenToday: {
        dailyWordCount: count,
        lastUpdated: moment()
      }
    } }
  );
}

bitSchema.pre('save', async function(next) {

  // Any fields that are not required, but need to have values, are set here
  this.name = this.name || this.content.split(' ').slice(0,4).join(' ')

  if (!this.isModified('name')) {
    console.log('checking for modification... finding an identical one')
    return next(); // move along, don't redo the slug if name hasn't changed
  }
  this.word_count = wordcount(this.content)

  // slugifies the name
  this.slug = slug(this.name);
  // find other stores with similar slug or slug-1
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const bitsWithSlug = await this.constructor.find({ slug: slugRegex });

  if(bitsWithSlug.length) {
    this.slug = `${this.slug}-${bitsWithSlug.length + 1}`;
  }

  addToUsersTotalWordCount(this.author, this.word_count)

  // moves things along to the next part
  next();

});

function autopopulate(next) {
  this.populate('author')
  next()
};

bitSchema.pre('find', autopopulate);
bitSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Bit', bitSchema);
