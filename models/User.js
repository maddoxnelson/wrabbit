const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
const slug = require('slugs');
import moment from 'moment';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  slug: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  trustedUsers: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ],
  streak : {
    type: Array
  },
  stats: {
    totalWordsWritten : {
      type: Number,
      default: 0
    },
    wordsWrittenToday: {
      dailyWordCount: {
        type: Number,
        default: 0
      },
      lastUpdated: {
        type: Date
      }
    }
  }
});

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200,
  resetPasswordToken: String,
  resetPasswordExpires: Date,`
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

userSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    console.log('checking for modification... finding an identical one')
    return next(); // move along, don't redo the slug if name hasn't changed
  }
  // slugifies the name
  this.slug = slug(this.name);
  // find other stores with similar slug or slug-1
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const usersWithSlug = await this.constructor.find({ slug: slugRegex });

  if(usersWithSlug.length) {
    this.slug = `${this.slug}-${usersWithSlug.length + 1}`;
  }

  // moves things along to the next part
  next();

});


module.exports = mongoose.model('User', userSchema);
