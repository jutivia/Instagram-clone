<template>
  <div class="main-container">
    <h1 class="header-text">Home</h1>
    <div class="newTweet">
      <div class="user">
        <div class="profle-pic">
          <img :src="user.profile" class="profile_pic" />
        </div>
        <div class="user-details">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="text-area"
            v-model="tweetText"
            placeholder="What's happening?"
            @input="resize()"
            ref="textarea"
          />
          <div class="icons">
            <div class="first-row">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="tweet-icon">
                <g>
                  <path
                    d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"
                  ></path>
                  <circle cx="8.868" cy="8.309" r="1.542"></circle>
                </g>
              </svg>
            </div>
            <button class="tweet-btn" :disabled="!tweetText" @click="tweet()">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!pageLoading && !error">
      <Tweets
        :tweets="tweets"
        :likeTweet="likeTweet"
        :renderComponent="renderComponent"
        :retweetTweet="retweetTweet"
        :resize="resize()"
        :quoteTweet="quoteTweet"
        :deleteTweet="deleteTweet"
      />
    </div>
    <div v-if="pageLoading" class="loading"><Loader /></div>
    <div class="showError" v-if="error && !pageLoading">
      <Error :reload="reload" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      pageLoading: false,
      loader: false,
      tweetText: "",
      tweets: [],
      renderComponent: 0,
      error: false,
      user: this.$store.state.user,
    };
  },
  created() {
    this.getTweets();
    this.$store.commit("setShowDelete", true);
    console.log(this.$store.state.user);
  },
  mounted() {
    this.resize()
  },
  computed: {
    months() {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    },
    watchTweets() {
      return this.tweets;
    },
  },
  watch: {
    watchTweets() {
      this.$forceUpdate();
    },
  },
  methods: {
    reload() {
      this.error = false;
      this.getTweets();
    },
    async likeTweet(tweetId, index) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/likes`)
        .catch((err) => console.log(err));
      if (request) {
        const liked = this.tweets[index].toggleLike;
        this.tweets[index].toggleLike = !liked;
        liked === false
          ? (this.tweets[index].likeNumber += 1)
          : (this.tweets[index].likeNumber -= 1);
        this.renderComponent += 1;
        // return this.tweets;
      }
    },
    async retweetTweet(tweetId, index) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/retweets`)
        .catch((err) => console.log(err));
      if (request) {
        const retweeted = this.tweets[index].toggleRetweet;
        this.tweets[index].toggleRetweet = !retweeted;
        retweeted === false
          ? (this.tweets[index].retweetNumber += 1)
          : (this.tweets[index].retweetNumber -= 1);
        this.renderComponent += 1;
        // return this.tweets;
      }
    },
    async getTweets() {
      this.pageLoading = true;
      const request = await this.$axios.get("/tweets").catch((err) => {
        this.error = true;
        this.pageLoading = false;
      });
      if (request) {
        this.tweets = request.data.tweets;
        this.tweets.map((tweet) => {
          tweet.toggleLike = tweet.likedByCurrentUser;
          tweet.toggleRetweet = tweet.retweetedByCurrentUser;
        });
      }
      this.pageLoading = false;
    },
    async logout() {
      this.loader = true;
      const onfulfilled = await this.$axios
        .get("/user/logout")
        .catch((err) => console.log(err));
      if (onfulfilled) {
        console.log(onfulfilled);
        this.$router.push("./index");
      }
      this.loader = false;
    },
    resize() {
      let element = this.$refs["textarea"];

      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
    async tweet() {
      this.loader = true;
      const onfulfilled = await this.$axios
        .post("/tweets", {
          content: this.tweetText,
        })
        .catch((err) => console.log(err));
      if (onfulfilled) {
        this.$toasted.success("Tweet sent successfully").goAway(2500);
        this.tweetText = "";
        this.getTweets();
      }
      this.loader = false;
    },
    async quoteTweet(tweetText, tweetId) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/quote-tweet`, {
          content: tweetText,
        })
        .catch((err) => console.log(err));
      if (request) {
        const req = await this.$axios
          .get("/tweets")
          .catch((err) => console.log(err));
        this.$store.commit("setQuoteModal", false);
        if (req) {
          this.tweets = req.data.tweets;
          this.tweets.map((tweet) => {
            tweet.toggleLike = tweet.likedByCurrentUser;
            tweet.toggleRetweet = tweet.retweetedByCurrentUser;
          });
        }
        this.renderComponent += 1;
      }
    },
    async deleteTweet(tweetId) {
      this.$store.commit("setLoading", true);
      this.$store.commit("setShowDelete", true);
      const request = await this.$axios
        .delete(`/tweets/${tweetId}`)
        .catch((err) => {
          this.$store.commit("setLoading", false);
          this.$store.commit("setShowDelete", false);
        });
      if (request) {
        this.$toasted.success("Tweet deleted successfully").goAway(2500);
        this.$store.commit("setLoading", false);
        this.$store.commit("setShowDelete", false);
        const req = await this.$axios
          .get("/tweets")
          .catch((err) => console.log(err));
        if (req) {
          this.tweets = req.data.tweets;
          this.tweets.map((tweet) => {
            tweet.toggleLike = tweet.likedByCurrentUser;
            tweet.toggleRetweet = tweet.retweetedByCurrentUser;
          });
        }
        this.renderComponent += 1;
      }
    },
  },
};
</script>

<style scoped>
.newTweet {
  width: 100%;
  border-bottom: 0.1px solid #e2e2ea37;
  padding: 2.5rem 16px;
  padding-bottom: 1rem;
}
.user,
.tweet {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 2rem;
}

.user-details h1 {
  color: rgba(210, 210, 210, 0.479);
  font-weight: 400;
  font-size: 22px;
  letter-spacing: 0.5px;
  margin-top: -3px;
  margin-left: 4px;
}
.user-details {
  /* margin-top: 4rem; */
  width: 90%;
}
.icons {
  display: flex;
  margin-top: 0rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 0.1px solid #e2e2ea37;
  padding-top: 1rem;
}
.tweet-icon {
  height: 1.5rem;
  width: 1.5rem;
  fill: rgb(29, 155, 240);
}
button.tweet-btn {
  background: rgb(29, 155, 240);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  border: none;
  color: rgb(231, 233, 234);
}
button:disabled.tweet-btn {
  background: rgba(29, 156, 240, 0.563);
  cursor: not-allowed;
  color: rgba(255, 255, 255, 0.563);
}
.text-area {
  width: 100%;
  background-color: transparent;
  padding: 1rem 0rem;
  /* font-size: 24px; */
  color: rgb(231, 233, 234);
}
.text-area:focus {
  outline: none;
}

.text-area::placeholder {
  color: rgba(255, 255, 255, 0.387);
}
textarea {
  font-size: 18px;
  /* min-height: 32px; */
  padding: 2px;
  resize: none;
  overflow: hidden;
  border: none;
  font-weight: 500;
}
.loading {
  margin: 2rem auto;
  display: flex;
  justify-content: center;
}
</style>