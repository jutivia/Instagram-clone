<template>
  <div
    class="main-container"
    @click="showTweetOptions = false"
    :key="renderComponent"
  >
    <div class="header-text">
      <div class="svg-container" @click="goBack()">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="back-icon">
          <g>
            <path
              d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"
            ></path>
          </g>
        </svg>
      </div>
      <h1>Tweet</h1>
    </div>
    <div v-if="showQuoteModal" class="modal-body">
      <QuoteTweet :tweet="tweet" :quoteTweet="quoteTweet" />
    </div>

    <div class="user">
      <div class="profle-pic">
        <img
          :src="tweet.user?.profilePic || '~/assets/images/home.svg'"
          class="profile_pic"
        />
      </div>
      <div class="user-details">
        <h4>{{ tweet.user ? tweet.user.name : "name" }}</h4>
        <h6>{{ tweet.user ? tweet.user.userName : "username" }}</h6>
      </div>
    </div>
    <div class="tweet">
      <h2 class="tweet-content">
        {{ tweet.content || "content" }}
      </h2>
      <div class="">
        <br />
        <Quoted-tweet
          v-if="tweet.tweetType === 'Quote Tweet'"
          :tweet="tweet.quotedTweet"
        />
      </div>
      <!-- <br /> -->
      <div class="tweet-stat">
        <span>{{ formatDate(tweet.createdAt) }}</span>
      </div>
    </div>
    <div class="engagement-stats">
      <div class="stat">
        <span class="span-text">{{ tweet.retweetNumber }}</span>
        <div>Retweets</div>
      </div>
      <div class="stat">
        <span class="span-text">{{ tweet.quoteTweetNumber }}</span>
        <div>Quote Tweets</div>
      </div>
      <div class="stat">
        <span class="span-text">{{ tweet.likeNumber }}</span>
        <div>Likes</div>
      </div>
    </div>
    <div class="engagements">
      <div class="icon-flex comments">
        <div class="svg-container">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="engagement-icons comment-icon"
          >
            <g>
              <path
                d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="icon-flex retweets">
        <div v-if="showTweetOptions == true" class="tweet-options">
          <div @click="retweetTweet(tweet._id)">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="engagement-icons"
            >
              <g>
                <path
                  d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
                ></path>
              </g>
            </svg>
            <span v-if="!tweet.toggleRetweet"> Retweet</span>
            <span v-else> Undo Retweet</span>
          </div>
          <div>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="engagement-icons"
            >
              <g>
                <path
                  d="M22.132 7.653c0-.6-.234-1.166-.66-1.59l-3.535-3.536c-.85-.85-2.333-.85-3.182 0L3.417 13.865c-.323.323-.538.732-.63 1.25l-.534 5.816c-.02.223.06.442.217.6.14.142.332.22.53.22.023 0 .046 0 .068-.003l5.884-.544c.45-.082.86-.297 1.184-.62l11.337-11.34c.425-.424.66-.99.66-1.59zm-17.954 8.69l3.476 3.476-3.825.35.348-3.826zm5.628 2.447c-.282.283-.777.284-1.06 0L5.21 15.255c-.292-.292-.292-.77 0-1.06l8.398-8.398 4.596 4.596-8.398 8.397zM20.413 8.184l-1.15 1.15-4.595-4.597 1.15-1.15c.14-.14.33-.22.53-.22s.388.08.53.22l3.535 3.536c.142.142.22.33.22.53s-.08.39-.22.53z"
                ></path>
              </g>
            </svg>
            <span
              @click.stop="
                (quotedTweet = tweet),
                  (showQuoteModal = true),
                  $store.commit('setQuoteModal', true)
              "
              >QuoteTweet</span
            >
          </div>
        </div>
        <div class="svg-container">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            :class="
              tweet.toggleRetweet
                ? 'engagement-icons retweet-icon'
                : 'engagement-icons'
            "
            @click.stop="showTweetOptions = true"
          >
            <g>
              <path
                d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="icon-flex likes">
        <div class="svg-container">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            :class="
              tweet.toggleLike
                ? 'engagement-icons like-icon'
                : 'engagement-icons'
            "
            @click="likeTweet(tweet._id)"
          >
            <g>
              <path
                v-show="!tweet.toggleLike"
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
              ></path>
              <path
                v-show="tweet.toggleLike"
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="icon-flex tip">
        <div class="svg-container">
          <span
            class="Icon Icon--medium"
            style="
              background: transparent;
              content: url('data:image/svg+xml,%3Csvg%20fill%3D%22inherit%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2015%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.821%2011.1L8.075%206.732v-2.38l4.917%208.195-2.17-1.447zm-6.03.965h5.397l1.752%201.168H2.747l2.043-1.168zm2.13-5.333L4.187%2011.08l-1.983%201.133%204.717-7.861v2.38zm.577%201.251l1.841%202.928H5.657l1.841-2.928zm7.42%205.53L7.993%201.97c-.018-.03-.043-.054-.066-.08a.568.568%200%2000-.429-.2.57.57%200%2000-.43.2c-.022.026-.047.05-.064.08L.079%2013.513a.59.59%200%2000-.061.143c-.002.004-.002.007-.002.01a.571.571%200%2000-.008.237.56.56%200%2000.064.193c.01.017.023.029.034.044.02.026.037.055.06.077.021.022.047.038.071.057.017.011.031.025.048.035.027.016.056.025.085.036.018.007.035.016.054.022a.597.597%200%2000.132.017c.006%200%20.012.003.017.003h13.85a.576.576%200%2000.495-.874z%22%20fill%3D%22%236A7684%22%2F%3E%3C%2Fsvg%3E');
              display: inline-block;
              font-size: 18px;
              font-style: normal;
              height: 16px;
              margin-top: 2px;
              position: relative;
              vertical-align: baseline;
              width: 16px;
            "
          ></span>
        </div>
        Tip
      </div>
    </div>
    <div class="tweet-reply">
      <span class="replyTo"
        >Replying to
        <span
          style="color: rgb(29, 155, 240); cursor: pointer"
          @click="$router.push('/profile')"
          >@{{ tweet.user ? tweet.user.userName : "username" }}</span
        ></span
      >
      <div class="reply-container">
        <div class="profle-pic1">
          <img :src="user.profile" class="profile_pic" />
        </div>
        <textarea
          type="text"
          name=""
          id=""
          placeholder="Tweet your reply"
          class="text-area"
          v-model="tweetText"
          @input="resize()"
          ref="textarea"
        ></textarea>
      </div>
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
        <button
          class="tweet-btn"
          :disabled="!tweetText"
          @click="addMainComment()"
        >
          <span v-if="!loader">Reply </span>
          <span v-else class="loading"><Loader /> </span>
        </button>
      </div>
    </div>
    <div>
      <Tweets
        :tweets="tweetComments"
        :deleteTweet="deleteCommentTweet"
        :likeTweet="likeCommentTweet"
        :renderComponent="renderComponent"
        :retweetTweet="retweetCommentTweet"
        :quoteTweet="quoteCommentTweet"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      tweetReply: "",
      tweetText: "",
      user: this.$store.state.user,
      tweets: [],
      tweet: {},
      showQuoteModal: false,
      showTweetOptions: false,
      renderComponent: 0,
      tweetComments: [],
      loader: false,
    };
  },
  computed: {
    months() {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    },
    watchQuoteClosers() {
      return this.$store.state.showQuoteModal;
    },
    watchDeleteModalCloser() {
      return this.$store.state.showDelete;
    },
  },
  watch: {
    watchDeleteModalCloser() {
      if (this.$store.state.showDelete === false) this.showDelete = false;
    },
    watchQuoteClosers() {
      if (this.$store.state.showQuoteModal === false) {
        this.showQuoteModal = false;
        this.$store.commit("setQuoteModal", true);
      }
    },
    $route() {
      this.getTweet();
    },
  },
  created() {
    this.getTweet();
  },
  methods: {
    async likeCommentTweet(tweetId, index) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/likes`)
        .catch((err) => console.log(err));
      if (request) {
        const liked = this.tweetComments[index].toggleLike;
        this.tweetComments[index].toggleLike = !liked;
        liked === false
          ? (this.tweetComments[index].likeNumber += 1)
          : (this.tweetComments[index].likeNumber -= 1);
        this.renderComponent += 1;
        // return this.tweets;
      }
    },
    async retweetCommentTweet(tweetId, index) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/retweets`)
        .catch((err) => console.log(err));
      if (request) {
        const retweeted = this.tweetComments[index].toggleRetweet;
        this.tweetComments[index].toggleRetweet = !retweeted;
        retweeted === false
          ? (this.tweetComments[index].retweetNumber += 1)
          : (this.tweetComments[index].retweetNumber -= 1);
        this.renderComponent += 1;
        // return this.tweets;
      }
    },
    formatDate(dateString) {
      if (!dateString) return;
      const date = new Date(dateString);
      const dayString = `${
        this.months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
      const timeString = date.toLocaleTimeString();
      return `${timeString}  ·  ${dayString} `;
    },
    async getTweet() {
      this.pageLoading = true;
      const request = await this.$axios
        .get(`/tweets/${this.$route.query.id}`)
        .catch((err) => {
          this.error = true;
          this.pageLoading = false;
        });
      if (request) {
        console.log(request);
        this.tweet = request.data.tweet;
        this.tweetComments = request.data.tweetComments;
        this.tweetComments.map((tweet) => {
          tweet.toggleLike = tweet.likedByCurrentUser;
          tweet.toggleRetweet = tweet.retweetedByCurrentUser;
        });
        this.tweet.toggleLike = this.tweet.likedByCurrentUser;
        this.tweet.toggleRetweet = this.tweet.retweetedByCurrentUser;
        console.log(this.tweet);
      }
      this.pageLoading = false;
    },
    async retweetTweet(tweetId) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/retweets`)
        .catch((err) => console.log(err));
      if (request) {
        const retweeted = this.tweet.toggleRetweet;
        this.tweet.toggleRetweet = !retweeted;
        retweeted === false
          ? (this.tweet.retweetNumber += 1)
          : (this.tweet.retweetNumber -= 1);
        this.renderComponent += 1;
        // return this.tweets;
      }
    },
    async likeTweet(tweetId) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/likes`)
        .catch((err) => console.log(err));
      if (request) {
        const liked = this.tweet.toggleLike;
        this.tweet.toggleLike = !liked;
        liked === false
          ? (this.tweet.likeNumber += 1)
          : (this.tweet.likeNumber -= 1);
        this.renderComponent += 1;
        // return this.tweets;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    resize() {
      let element = this.$refs["textarea"];

      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
    async quoteCommentTweet(tweetText, tweetId, index) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/quote-tweet`, {
          content: tweetText,
        })
        .catch((err) => console.log(err));
      if (request) {
        this.tweetComments[index].quoteTweetNumber += 1;
        this.renderComponent += 1;
      }
    },
    async quoteTweet(text, tweetId) {
      const request = await this.$axios
        .post(`/tweets/${tweetId}/quote-tweet`, {
          content: text,
        })
        .catch((err) => console.log(err));
      if (request) {
        this.$store.commit("setQuoteModal", false);
        if (request) {
          this.tweet.quoteTweetNumber = this.tweet.quoteTweetNumber + 1;
        }
        this.renderComponent += 1;
      }
    },
    async addMainComment() {
      this.loader = true;
      const request = await this.$axios
        .post(`/tweets/${this.tweet._id}/main-comment`, {
          content: this.tweetText,
        })
        .catch((err) => console.log(err));
      if (request) {
        this.$toasted.success("Tweet sent successfully").goAway(2500);
        this.loader = false;
        this.tweetText = "";
        const req = await this.$axios
          .get(`/tweets/${this.tweet._id}/main-comment`)
          .catch((err) => console.log(err));
        if (req) {
          this.tweetComments = req.data.comments;
          this.tweetComments.map((tweet) => {
            tweet.toggleLike = tweet.likedByCurrentUser;
            tweet.toggleRetweet = tweet.retweetedByCurrentUser;
          });
        }
        this.renderComponent += 1;
      }
    },
    async deleteCommentTweet(tweetId) {
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
          .get(`/tweets/${this.tweet._id}/main-comment`)
          .catch((err) => console.log(err));
        if (req) {
          this.tweetComments = req.data.comments;
        }
        this.renderComponent += 1;
      }
    },
  },
};
</script>

<style scoped>
.back-icon {
  color: rgb(239, 243, 244);
  width: 20px;
  height: 20px;
  fill: rgb(239, 243, 244);
}
.svg-container {
  padding: 10px 10px 5px 10px;
  cursor: pointer;
  border-radius: 50%;
}
.svg-container:hover {
  background-color: rgba(255, 255, 255, 0.127);
}
.user {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 0 1.5rem;
  padding-top: 7rem;
  align-items: center;
}
.tweet {
  padding: 1rem 1.5rem;
}
.tweet-content {
  word-wrap: break-word;
  color: rgb(231, 233, 234);
  font-size: 23px;
  line-height: 28px;
  font-weight: 400;
}
.tweet-stat {
  display: flex;
  gap: 0.5rem;
  color: rgb(113, 118, 123);
  font-size: 17px;
  font-weight: 400;
  padding: 0rem 0;
  padding-top: 1rem;
}
.engagement-icons {
  fill: rgb(113, 118, 123);
  height: 1.5em;
  width: 1.5em;
}
.comments:hover svg {
  fill: blue;
}
.svg-container {
  padding: 10px;
  border-radius: 50%;
}
.comments:hover .svg-container,
.retweets:hover .svg-container,
.likes:hover .svg-container {
  background-color: rgba(255, 255, 255, 0.083);
}
.retweet-icon {
  fill: rgb(1, 196, 1);
}
.like-icon {
  fill: rgb(255, 75, 105);
}
.retweets:hover svg {
  fill: rgb(1, 196, 1);
}
.retweets {
  position: relative;
}
.likes:hover svg {
  fill: rgb(255, 75, 105);
}
.tip:hover {
  color: rgb(186, 0, 186);
}
.engagements,
.engagement-stats {
  display: flex;
  width: 95%;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  border-top: 1px solid #e2e2ea37;
  border-bottom: 1px solid #e2e2ea37;
  margin: 0 1rem;
}
.engagement-stats {
  justify-content: flex-start;
  gap: 2rem;
  border-bottom: none;
  padding: 1.2rem 2rem;
}
.icon-flex,
.stat {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  color: rgb(113, 118, 123);
  font-size: 14px;
  line-height: 16px;
}
.stat:hover {
  text-decoration: underline;
  text-decoration-color: rgb(239, 243, 244);
}
.span-text {
  color: rgb(239, 243, 244);
  font-weight: 700;
}
.tweet-reply {
  padding: 1rem 1rem;
  border-bottom: 1px solid #e2e2ea37;
}
.text-area {
  width: 100%;
  background-color: transparent;
  padding: 1rem 0rem;
  font-size: 20px;
  color: rgb(231, 233, 234);
}
.text-area:focus {
  outline: none;
}

.text-area::placeholder {
  color: rgba(255, 255, 255, 0.387);
}
textarea {
  font-size: 20px;
  min-height: 32px;
  padding: 2px;
  resize: none;
  overflow: hidden;
  border: none;
}
.reply-container {
  display: flex;
  gap: 1.8rem;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
}
.reply-container .profle-pic1 {
  padding-top: 5px;
  /* justify-content: flex-start; */
}
.profile_pic {
  height: 48px;
  width: 48px;
}
.icons {
  display: flex;
  margin-top: 0rem;
  justify-content: space-between;
  align-items: center;
  padding-top: 0rem;
  margin-left: 5rem;
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
  color: white;
}
button:disabled.tweet-btn {
  background: rgba(29, 156, 240, 0.563);
  cursor: not-allowed;
  color: rgba(255, 255, 255, 0.563);
}
.header-text h1 {
  font-size: 22px;
}
.replyTo {
  color: rgb(113, 118, 123);
  margin-left: 4.7rem;
  margin-bottom: 0.5rem;
}
.tweet-options {
  position: absolute;
  border: 1px solid black;
  /* padding:3rem; */
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
    rgb(255 255 255 / 15%) 0px 0px 3px 1px;
  background: black;
  top: -0.5rem;
  left: -10rem;
  z-index: 1;
  min-width: 220px;
  border-radius: 5px;
}
.tweet-options div,
.more-options div {
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
}
.tweet-options div:hover,
.more-options div:hover {
  background: rgba(255, 255, 255, 0.05);
}

.retweets:hover .tweet-options div svg,
.more:hover .more-options div svg {
  color: rgb(113, 118, 123);
  fill: rgb(113, 118, 123);
}
.loading {
  display: flex;
  justify-content: center;
}
</style>