const mongoose = require("mongoose");
const UserFollowing = require("./following-table");
const RetweetSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
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
  },
  isFollowingRetweeter: {
    type: Boolean,
    default: false,
  },
});
RetweetSchema.methods.getuserFollowing = async function () {
  const following = await UserFollowing.find({
    userId: tweetPosterId,
    followingId: this.userId,
  });
  if (following) this.isFollowingRetweeter = true;
};
module.exports = mongoose.model("Retweet", RetweetSchema);
