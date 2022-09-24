const mongoose = require('mongoose');
const UserFollowing = require('./following-table')
const LikeSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Types.ObjectId,
  },
  tweetPosterId: {
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
  isFollowingLiker: {
    type: Boolean,
    default: false,
  },
});
LikeSchema.methods.getuserFollowing = async function () {
    const following = await UserFollowing.find({ userId: tweetPosterId, followingId: this.userId });
    if(following) this.isFollowingLiker = true
}
module.exports = mongoose.model("Like", LikeSchema);