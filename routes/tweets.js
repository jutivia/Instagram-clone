const express = require("express");
const router = express.Router();


const {
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
} = require("../controllers/tweets");

router.route("/").post(createTweet).get(getAllMainTweets);
router.route("/:tweetId").delete(deleteTweet).get(getTweetDetails);
router.route("/:tweetId/likes").get(getAllTweetLikers).post(likeTweet);
router.route("/:tweetId/retweets").get(getAllTweetRetweeters).post(retweetTweet);
router.route("/:tweetId/quote-tweet").get(getAllTweetQuoteTweets).post(quoteTweet);
router.route("/:tweetId/main-comment")
  .post(addCommentUnderTweet)
  .get(getMainComments);
router.post("/:tweetId/sub-comment", addCommentUnderTweetComment);

module.exports = router;