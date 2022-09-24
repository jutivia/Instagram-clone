const mongoose = require('mongoose');
const Likes = require('./post-likes')
const Retweets = require('./post-retweet')
const TweetSchema = new mongoose.Schema(
  {
    likedByCurrentUser: {
      type: Boolean,
      default: false,
    },
    retweetedByCurrentUser: {
      type: Boolean,
      default: false,
    },
    tweetType: {
      type: "String",
      enum: ["Main Tweet", "Quote Tweet", "Comment"],
    },
    mainTweetId: mongoose.Types.ObjectId,
    hasParentComment: {
      type: Boolean,
      default: false,
    },
    parentId: mongoose.Types.ObjectId,
    user: {
      userName: {
        type: String,
        required: [true, "Username is required"],
      },
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      profilePic: {
        type: String,
        // required: [true, "ProfilePic is required"],
      },
      userId: {
        type: mongoose.Types.ObjectId,
      },
    },
    quotedTweet: {
      user: {
        name: String,
        userName: String,
        profilePic: String,
        userId: mongoose.Types.ObjectId,
      },
      tweetType: String,
      content: String,
      tweetMedia: String,
      createdAt: Date,
      quotedTweetId: mongoose.Types.ObjectId,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxLength: 280,
    },
    tweetMedia: "",
    commentNumber: {
      type: Number,
      default: 0,
    },
    retweetNumber: {
      type: Number,
      default: 0,
    },
    quoteTweetNumber: {
      type: Number,
      default: 0,
    },
    likeNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
TweetSchema.methods.getTweetEngagements = async function () {
    const likes = await Likes.find({ tweetId: this._id }).count()
  this.likeNumber = likes
  
    const retweets = await Retweets.find({ tweetId: this._id }).count()
  this.retweetNumber = retweets
  
    const quoteTweetNumber = await this.model("Tweet")
      .find({
        tweetType: "Quote Tweet",
        "quotedTweet.quotedTweetId": this._id,
      })
      .count();
  this.quoteTweetNumber = quoteTweetNumber
  
    const commentNumber = await this.model('Tweet').find({
      tweetType: "Comment",
      mainTweetId: this._id,
    }).count();
    this.commentNumber = commentNumber
};
TweetSchema.methods.CheckLikedOrRetweetedByUser = async function (userId) {
  const isLikedByUser = await Likes.findOne({ tweetId: this._id, userId });
  if (isLikedByUser) this.likedByCurrentUser = true;

  const isRetweetedByUser = await Retweets.findOne({
    tweetId: this._id,
    userId: userId,
  });
  if (isRetweetedByUser) this.retweetedByCurrentUser = true;
};

// TweetSchema.pre("find", async function () {
//   const isLikedByUser = await Likes.findOne({ tweetId: this._id, userId });
//   if (isLikedByUser) this.likedByCurrentUser = true;

//   const isRetweetedByUser = await Retweets.findOne({
//     tweetId: this._id,
//     userId: userId,
//   });
//   if (isRetweetedByUser) this.retweetedByCurrentUser = true;

//   const likes = await Likes.find({ tweetId: this._id }).count();
//   this.likeNumber = likes;

//   const retweets = await Retweets.find({ tweetId: this._id }).count();
//   this.retweetNumber = retweets;

//   const quoteTweetNumber = await this.find({
//     tweetType: "Quote Tweet",
//     mainTweetId: this._id,
//   }).count();
//   this.quoteTweetNumber = quoteTweetNumber;

//   const commentNumber = await this.find({
//     tweetType: "Comment",
//     mainTweetId: this._id,
//   }).count();
//   this.commentNumber = commentNumber;
// });
module.exports = mongoose.model("Tweet", TweetSchema);

