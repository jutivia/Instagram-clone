const User = require("../models/user");
const Follow = require('../models/following-table')
const { StatusCodes } = require("http-status-codes");
const {
  BadRequest,
  UnAuthorized,
  InternalServerError,
  NotVerified,
  UserNotFound,
} = require("../errors");

const logout = async (req, res) => {};

const editUserDetails = async (req, res) => {
  const { name, username, profilePic, headerPic, bio, location } = req.body;
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new UserNotFound();
  await user.findOneAndUpdate(
    { _id: userId },
    {
      fullName: name,
      userName: username,
      profilePic,
      headerPic,
      bio,
      location,
    },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.CREATED).json({ msg: "User updated successful" });
};

const updateProfile = async (req, res) => {
  const { profilePic, userName } = req.body;
  if (!profilePic && !userName)
    throw new BadRequest("Enter a profile picture or userName");

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.userId,
    },
    { userName },
    { new: true, runValidators: true }
  );
  if (!user) throw new UserNotFound();
  const approved = user.verified;
  if (!approved) throw new NotVerified("Email not verified");
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User details updated successfully" });
};

const followUser = async (req, res) => {
  const { userId } = req.user
  const {followingId} = req.params
  const following = await Follow.findOne({ userId, followingId })
  if (following) throw new BadRequest('User followed already');
  const user = await User.findOne({ _id: followingId });
  if (!user) throw new UserNotFound()
  Follow.create({
    userId,
    followingId,
    nameOfFollowed: user.fullName,
    profilePicOfFollowed: user.profilePic,
    usernameOfFollowed: user.userName,
  });
  res.status(StatusCodes.CREATED).json({ msg: `${user.userName} followed successfully ` })
}

const unfollowUser = async (req, res) => {
   const { userId } = req.user;
   const { followingId } = req.params;
   const following = await Follow.findOne({ userId, followingId });
   if (!following) throw new BadRequest("User not followed already");
   const user = await User.findOne({ _id: followingId });
   if (!user) throw new UserNotFound();
   Follow.findOneAndDelete({
     userId,
     followingId,
   });
   res
     .status(StatusCodes.CREATED)
     .json({ msg: `${user.userName} unfollowed successfully ` });
}

const getAllUserFollowers = async (req, res) => {
  const { userId } = req.user;
  const followers = await Follow.find({ followingId: userId });
  res.status(StatusCodes.Ok).json({length: followers.length, followers})
}

const getAlluserFollowing = async (req, res) => {
     const { userId } = req.user;
     const followings = await Follow.find({ userId });
     res.status(StatusCodes.Ok).json({ length: followings.length, followings });
}

const getAllUserTweets = async (req, res) => {
  const { userId } = req.user
  const userTweets = await Tweets.aggregate([
    {
      $match: { $or: [{ retweetedByCurrentUser: true }, {'user.userId': userId}]},
    },
  ]);

}

const getAllUserTweetsAndReplies = async (req, res) => {
   
}

const getAllUserMedia = async (req, res) => {
  const { userId } = req.user;
  const tweets = await Tweets.find({ "user.userId": userId, tweetMedia: { $exists: true } });
  res.status(StatusCodes.OK).json({ length: tweets.length, tweets });
}

const getAllUserLikes = async (req, res) => {
  const { userId } = req.user;
  const likes = await Likes.find({ "user.userId": userId }).select(_id);
  const tweets = await Tweet.find({ _id: { $in: likes } });
  res.status(StatusCodes.OK).json({ length: tweets.length, tweets })
}

const getOwnProfile = async (req, res) => {
  const { userId } = req.user
  const user = await User.find({ _id: userId }).select(
    fullName,
    userName,
    profilePic,
    followingNumber,
    followerNumber
  );
  await user.getUserFollowings();
  res.status(StatusCodes.OK).json({user})
}
const getUserProfile = async (req, res) => {
  const { userId } = req.params
  const myId = req.user.userId
  let checkFollowing = false
  const user = await User.find({ _id: userId }).select(
    fullName,
    userName,
    profilePic,
    followingNumber,
    followerNumber
  );
  await user.getUserFollowings()
   const following = await UserFollowing.find({ userId: myId, followingId: userId });
    if(following) checkFollowing = true
  user.isFollowing = checkFollowing;
  res.status(StatusCodes.OK).json({user})
}

module.exports = {
  editUserDetails,
  logout,
  updateProfile,
  followUser,
  unfollowUser,
  getAllUserFollowers,
  getAlluserFollowing,
  getAllUserMedia,
  getAllUserLikes,
  getOwnProfile,
  getUserProfile,
};