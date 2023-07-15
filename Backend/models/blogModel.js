const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// Declare the Schema of the Mongo model
const blogSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },

    description: {
      required: true,
      type: String,
    },

    category: {
      type: String,
      required: true,
    },
    numOfViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },

    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    image: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2016/04/01/10/04/amusing-1299756_960_720.png',
    },
  },
  {
    timestamps: true,
  }
);

// encrypting of password...( Hashing...)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  //   Hash Password
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method for password checking..
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //Ten{10} minutes
  console.log(this.passwordResetExpires);
  return resetToken;
};
//Export the model
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
