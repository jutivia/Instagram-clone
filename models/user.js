const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const random = require("randomstring");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserVerification = require('./user-verfication')
const Following = require('./following-table')
const { InternalServerError } = require('../errors')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    required: [true, "Kindly enter your email addres"],
  },
  userSignType: {
    type: String,
    enums: ['email', 'googleId']
  },
  fullName: {
    type: String,
    required: [true, "kindly enter your full name"],
    maxLength: [50, 'must be 50 characters or less']
  },
  DateOfBirth: {
      type: Date,
      required: [true, "kindly enter your date of birth"]
    },
    verified: {
        type: Boolean,
        default: false
  },
  password: {
    type: String,
    },
    profilePic: {
      
    },
    userName: {
        type: String,
      unique: [true, 'Kindly enter your user name'],
      maxLength: [15, 'must be 15 characters or less']
    },
    followingNumber: {
        type: Number,
        default: 0
    },
    followersNumber: {
        type: Number,
        default: 0,
    },
    headerPic: {

    },
    bio: {
        type: String,
        maxLength: [160, 'must be 160 characters or fewer']
    },
    location: {

    }
}, { timestamps: true });


UserSchema.methods.createJWT = function () {
     return jwt.sign(
       {
         userId: this._id,
         name: this.fullName,
       },
       process.env.JWT_SECRET,
       {
         expiresIn: process.env.JWT_LIFETIME,
       }
     );
} 

UserSchema.methods.sendMail = async function () {
    const done = true
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })
    const uniqueCode = random.generate({
      length: 6,
      charset: "numeric",
    });

     let mailOptions = {
       from: process.env.USER_EMAIL,
       to: this.email,
       Subject: "Verify Your Email",
       html: `<h2> Confirm your email address</h2> <p>There’s one quick step you need to complete before creating your Twitter account. Let’s make sure this is the right email address for you — please confirm this is the right address to use for your new account </p> <p> Please enter this verification code to get started on Twitter:</p> <h2> ${uniqueCode}</h2> <p> Verification codes expire after two hours. <br>  
        Thanks,<br>
        Twitter </p>`,
     };
    const salt = await crypt.genSalt(10);
    const hash = await crypt.hash(uniqueCode.toString(), salt);
    await UserVerification.create({
        userId: this._id,
        uniqueString: hash,
        expiresAt: Date.now() + 7200000,
    }).catch((err) => { console.log(err); done = false;  throw new InternalServerError(err.message || 'Internal server error') });
    
    transporter
      .sendMail(mailOptions)
        .catch((err) => { console.log(err); done = false; throw new InternalServerError(err.message || 'Sending verification email failed') });
    return done
}

UserSchema.methods.sendResetPasswordCode = async function () {
  const done = true;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });
  const uniqueCode = random.generate({
    length: 6,
    charset: "numeric",
  });

  let mailOptions = {
    from: process.env.USER_EMAIL,
    to: this.email,
    Subject: "Reset password",
    html: `<h2> Confirm your email address</h2> <p>There’s one quick step you need to complete before reseting your Twitter password. Let’s make sure this is the right email address for you — please confirm this is the right address you use for your existing account </p> <p> Please enter this verification code to get generate a new password on Twitter:</p> <h2> ${uniqueCode}</h2> <p> Verification codes expire after two hours. <br>  
        Thanks,<br>
        Twitter </p>`,
  };
  const salt = await crypt.genSalt(10);
  const hash = await crypt.hash(uniqueCode.toString(), salt);
  await UserVerification.findOneAndUpdate(
    {
      userId: this._id,
    },
    {
      uniqueString: hash,
      expiresAt: Date.now() + 7200000,
    },
    { new: true, runValidators: true }
  ).catch((err) => {
    console.log(err);
    done = false;
    throw new InternalServerError(err.message || "Internal server error");
  });

  transporter.sendMail(mailOptions).catch((err) => {
    console.log(err);
    done = false;
    throw new InternalServerError(
      err.message || "Sending verification email for password reset failed"
    );
  });
  return done;
}

UserSchema.methods.getUserFollowings = async function () {
      const following = await Following.find({
        userId: tweetPosterId,
      }).count();
  this.followingNumber = following
  const followers = await Following.find({ followingId: this._id }).count()
  this.followersNumber = followers
}
module.exports = mongoose.model("User", UserSchema)