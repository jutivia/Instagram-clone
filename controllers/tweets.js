const Tweet = require('../models/tweets')
const User = require('../models/user')
const Likes = require('../models/post-likes')
const Retweets = require('../models/post-retweet')
const { StatusCodes } = require("http-status-codes");
const {
  BadRequest,
  UnAuthorized,
  InternalServerError,
  NotVerified,
  UserNotFound,
} = require("../errors");

const createTweet = async (req, res) => {
    const { userId } = req.user
    const { content, tweetMedia } = req.body;
    const user = await User.findOne({ _id: userId })
    if (!user) throw new UserNotFound();
    const tweet = await Tweet.create({
      tweetType: "Main Tweet",
      user: {
        userName: user.userName,
        name: user.fullName,
        // profilePic: user.profilePic,
        userId: user._id,
      },
      content,
      tweetMedia,
    });
    res.status(StatusCodes.CREATED).json({msg: 'Tweet created successfully'});
}

const deleteTweet = async (req, res) => {
    const { tweetId } = req.params
    const tweet = await Tweet.findOneAndDelete({ _id: tweetId });
    if (!tweet) throw new BadRequest('Tweet not found')
    res.status(StatusCodes.OK).json({msg: 'Tweet deleted successfully'})
}

const getAllMainTweets = async (req, res) => {
  const allMainTweets = await Tweet.find().sort({ createdAt: -1 });
   const tweets = [];
   for (let i = 0; i < allMainTweets.length; i++) {
     await allMainTweets[i].getTweetEngagements();
     await allMainTweets[i].CheckLikedOrRetweetedByUser(req.user.userId);
     tweets.push(allMainTweets[i]);
   }
  res.status(StatusCodes.OK).json({ length: tweets.length, tweets });
};

const getTweetDetails = async (req, res) => {
    const { tweetId } = req.params
    const tweet = await Tweet.findOne({ _id: tweetId })
    await tweet.getTweetEngagements()
    await tweet.CheckLikedOrRetweetedByUser(req.user.userId)
  const preTweetComments = await Tweet.find({ tweetType: 'Comment', mainTweetId: tweetId, hasParentComment:false });
    const tweetComments = [];
    for (let i = 0; i < preTweetComments.length; i++) {
        await preTweetComments[i].getTweetEngagements();
        await preTweetComments[i].CheckLikedOrRetweetedByUser(req.user.userId);
      tweetComments.push(preTweetComments[i]);
    }
    res.status(StatusCodes.OK).json({ tweet, tweetComments});
}

const getAllTweetLikers = async (req, res) => {
    const { tweetId } = req.params;
    const prelikers = await Likes.find({ tweetId });
    const likers = []
    for (let i = 0; i < prelikers.length; i++) {
      await prelikers[i].getuserFollowing();
      likers.push(prelikers[i]);
    }
    res.status(StatusCodes.OK).json({ tweetLikers: likers });
}

const getAllTweetRetweeters = async (req, res) => {
  const { tweetId } = req.params;
  const preRetweeters = await Retweets.find({ tweetId });
  const retweeters = [];
  for (let i = 0; i < preRetweeters.length; i++) {
      await preRetweeters[i].getuserFollowing();
    retweeters.push(preRetweeters[i]);
  }
  res.status(StatusCodes.OK).json({ tweetRetweeters: retweeters });
};

const getAllTweetQuoteTweets = async (req, res) => {
    const { tweetId } = req.params;
    const preQuoteTweets = await Tweet.find({
      tweetType: "Quote Tweet",
        mainTweetId: tweetId
    });
    const quoteTweets = [];
    for (let i = 0; i < preQuoteTweets.length; i++) {
        await preQuoteTweets[i].getTweetEngagements();
        await preQuoteTweets[i].CheckLikedOrRetweetedByUser(req.user.userId);
      quoteTweets.push(preQuoteTweets[i]);
    }
    res
      .status(StatusCodes.Ok)
      .json({ length: quoteTweets.length, quoteTweets });
}

const addCommentUnderTweet = async (req, res) => {
    const { tweetId } = req.params
    const { content } = req.body
    const { userId } = req.user
    const user = await User.findOne({ _id: userId })
    if (!user) throw new UserNotFound()
    await Tweet.create({
      tweetType: "Comment",
      mainTweetId: tweetId,
      user: {
        userName: user.userName,
        name: user.fullName,
        profilePic: user.profilePic,
        userId: user._id,
      },
      content,
    });
    res.status(201).json({msg: 'Tweet sent successfully'})
    
}

const addCommentUnderTweetComment = async (req, res) => {
    const { parentId, tweetId } = req.params;
    const { content } = req.body;
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });
    if (!user) throw new UserNotFound();
     await Tweet.create({
       tweetType: "Comment",
       hasParentComment: true,
         parentId,
       mainTweetId: tweetId,
       user: {
         userName: user.userName,
         name: user.fullName,
         profilePic: user.profilePic,
         userId: user._id,
       },
       content,
     });
     res.status(201).json({ msg: "Tweet sent successfully" });
};

const likeTweet = async (req, res) => {
    const { tweetId, tweetPosterId } = req.params;
    const { userId } = req.user
    const like = await Likes.findOne({ tweetId, userId });
  if (like) {
    await Likes.findOneAndDelete({ tweetId, userId });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Tweet unliked successfully" });
  }
    const user = await User.findOne({ _id: userId })
  if (!user) throw new UserNotFound()
  const tweet = await Tweet.findOne({ tweetId })
  await Tweet.findOneAndUpdate(
    { tweetId },
    { likeNumber: tweet.likeNumber + 1},
    { new: true, runValidators: true }
  );
    await Likes.create({
      tweetId,
      tweetPosterId,
      userId,
      user: {
        userName: user.userName,
        name: user.fullName,
        profilePic: user.profilePic,
      },
    });
    return res.status(StatusCodes.OK).json({ msg: "Tweet liked successfully" });
}

const retweetTweet = async (req, res) => {
     const { tweetId, tweetPosterId } = req.params;
     const { userId } = req.user;
     const retweet = await Retweets.findOne({ tweetId, userId });
  if (retweet) {
    await Retweets.findOneAndDelete({ tweetId, userId });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Tweet unretweeted successfully" });
  }
     const user = await User.findOne({ _id: userId });
  if (!user) throw new UserNotFound();
   const tweet = await Tweet.findOne({ tweetId });
   await Tweet.findOneAndUpdate(
     { tweetId },
     { retweetNumber: tweet.retweetNumber + 1 },
     { new: true, runValidators: true }
   );
     await Retweets.create({
       tweetId,
       tweetPosterId,
       userId,
       user: {
         userName: user.userName,
         name: user.fullName,
         profilePic: user.BadRequest,
       },
     });
     res.status(StatusCodes.OK).json({ msg: "Tweet retweeted successfully" });
}

const quoteTweet = async (req, res) => {
  const { tweetId } = req.params
  const { userId } = req.user
  const {content} = req.body
    const user = await User.findOne({ _id: userId });
    if (!user) throw new UserNotFound();
  const parentTweet = await Tweet.findOne({ _id: tweetId })
   await Tweet.findOneAndUpdate(
     { tweetId },
     { retweetNumber: parentTweet.quoteTweetNumber + 1 },
     { new: true, runValidators: true }
   );
    await Tweet.create({
      tweetType: "Quote Tweet",
      mainTweetId:
        parentTweet.tweetType === "Main Tweet"
          ? parentTweet._id
          : parentTweet.mainTweetId,
      user: {
        userName: user.userName,
        name: user.fullName,
        profilePic: user.profilePic,
        userId: user._id,
      },
      quotedTweet: {
        user: {
          name: parentTweet.user.name,
          userName: parentTweet.user.userName,
          profilePic: parentTweet.user.profilePic,
          userId: parentTweet.user.userId,
        },
        tweetType: parentTweet.tweetType,
        content: parentTweet.content,
        tweetMedia: parentTweet.tweetMedia,
        createdAt: parentTweet.createdAt,
        quotedTweetId: tweetId,
      },
      content,
    });
    res.status(201).json({ msg: "Tweet sent successfully" });
}

const getMainComments = async (req, res) =>{
  const { tweetId } = req.params;
  const preComments = await Tweet.find({
    mainTweetId: tweetId,
    tweetType: "Comment",
    hasParentComment: false,
  });
  const comments = []
   for (let i = 0; i < preComments.length; i++) {
     await preComments[i].getTweetEngagements();
     await preComments[i].CheckLikedOrRetweetedByUser(req.user.userId);
     comments.push(preComments[i]);
   }
   res.status(StatusCodes.OK).json({comments})
}
module.exports = {
  createTweet,
  deleteTweet,
  getAllMainTweets,
  getTweetDetails,
  getAllTweetLikers,
  getAllTweetRetweeters,
  getAllTweetQuoteTweets,
  addCommentUnderTweet,
  addCommentUnderTweetComment,
  likeTweet,
  retweetTweet,
  quoteTweet,
  getMainComments,
};