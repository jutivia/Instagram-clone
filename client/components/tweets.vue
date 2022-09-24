<template>
  <div
    class="tweets"
    :key="renderComponent"
    @click="(showTweetOptions = false), (showOptions = false)"
  >
    <div class="tweet" v-for="(tweet, index) in tweets" :key="tweet._id">
      <div v-if="showQuoteModal" class="modal-body">
        <QuoteTweet
          :tweet="quotedTweet"
          :quoteTweet="quoteTweet"
          :index="number"
        />
      </div>
      <div class="profle-pic">
        <img :src="tweet.user.profilePic || '~/assets/images/home.svg'" class="profile_pic" />
      </div>
      <div class="tweet-container">
        <div class="header-flex">
          <div class="tweet-user-details">
            <span class="text">{{ tweet.user.name }}</span>
            <span class="grey-text">@{{ tweet.user.userName }}</span>
            <span class="dot"></span>
            <span class="grey-text"> {{ formatDate(tweet.createdAt) }} </span>
          </div>
          <div
            class="more"
            @click.stop="(showOptions = true), (number = index)"
          >
            <div class="svg-container">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="engagement-icons"
              >
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </div>
            <div class="more-options" v-if="showOptions && index == number">
              <div v-show="user.id === tweet.user.userId">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="engagement-icons more-icon delete"
                >
                  <g>
                    <path
                      d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"
                    ></path>
                    <path
                      d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"
                    ></path>
                  </g>
                </svg>
                <span
                  @click.stop="
                    showOptions = false;
                    showDelete = true;
                    tweetId = tweet._id;
                  "
                  class="delete"
                  >Delete</span
                >
              </div>
              <div v-show="user.id !== tweet.user.userId">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="engagement-icons more-icon"
                >
                  <g>
                    <path
                      d="M23.152 3.483h-2.675V.81c0-.415-.336-.75-.75-.75s-.75.335-.75.75v2.674H16.3c-.413 0-.75.336-.75.75s.337.75.75.75h2.677V7.66c0 .413.336.75.75.75s.75-.337.75-.75V4.982h2.675c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zM8.417 11.816c1.355 0 2.872-.15 3.84-1.256.813-.93 1.077-2.367.806-4.392-.38-2.826-2.116-4.513-4.646-4.513S4.15 3.342 3.77 6.168c-.27 2.025-.007 3.462.807 4.393.968 1.108 2.485 1.257 3.84 1.257zm-3.16-5.448c.16-1.2.786-3.212 3.16-3.212 2.373 0 2.998 2.013 3.16 3.212.207 1.55.056 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.256-.223-2.71-.743c-.507-.578-.658-1.656-.45-3.205zm11.44 12.867c-.88-3.525-4.283-5.988-8.28-5.988-3.998 0-7.403 2.463-8.28 5.988-.172.693-.03 1.4.395 1.94.408.522 1.04.822 1.733.822H14.57c.69 0 1.323-.3 1.73-.82.425-.54.568-1.247.396-1.942zm-1.577 1.018c-.126.16-.316.245-.55.245H2.264c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.113 1.994 6.824 4.85c.06.24.017.48-.12.655z"
                    ></path>
                  </g>
                </svg>
                <span>Follow @{{ tweet.user.userName }}</span>
              </div>
            </div>
            <div v-if="showDelete" class="modal-body">
              <div class="modal-container">
                <h1>Delete Tweet?</h1>
                <p>
                  This can’t be undone and it will be removed from your profile,
                  the timeline of any accounts that follow you, and from Twitter
                  search results.
                </p>
                <button
                  @click.stop="deleteTweet(tweetId)"
                  class="delete-btn red"
                >
                  <span v-if="$store.state.loading" class="loading"
                    ><Loader
                  /></span>
                  <span v-else>Delete </span>
                </button>
                <button @click="showDelete = false" class="delete-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <span
          v-if="tweet.tweetType === 'Comment'"
          style="color: rgb(113, 118, 123); marginTop:-1rem;"
          >Replying to
          <span
            style="color: rgb(29, 155, 240); cursor: pointer"
            @click="$router.push('/profile')"
            >@{{ tweet.user.userName }}</span
          ></span
        >
        <div class="tweet-details">
          <div
            class="text"
            @click="
              tweet.tweetType === 'Comment'
                ? $router.push('./sub-comment-thread')
                : $router.push({path: './tweet-detail',
                  query: { id: tweet._id }
                  })
            "
          >
            {{ tweet.content }}
          </div>
          <div class="">
            <br />
            <Quoted-tweet
              v-if="tweet.tweetType === 'Quote Tweet'"
              :tweet="tweet.quotedTweet"
            />
          </div>
          <div
            @click="
              tweet.tweetType === 'Comment'
                ? $router.push('./sub-comment-thread')
                : $router.push('./tweet-detail')
            "
            v-if="tweet.media"
            class="media"
          >
            <img :src="tweet.image" alt="" />
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
              {{ tweet.commentNumber }}
            </div>
            <div class="icon-flex retweets">
              <div
                v-if="showTweetOptions == true && index === number"
                class="tweet-options"
              >
                <div @click="retweetTweet(tweet._id, index)">
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
                        (number = index),
                        $store.commit('setQuoteModal', true)
                    "
                    >QuoteTweet</span
                  >
                </div>
              </div>

              <div
                class="svg-container"
                @click.stop="(showTweetOptions = true), (number = index)"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  :class="
                    tweet.toggleRetweet
                      ? 'engagement-icons retweet-icon'
                      : 'engagement-icons'
                  "
                >
                  <g>
                    <path
                      d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
                    ></path>
                  </g>
                </svg>
              </div>
              {{ tweet.retweetNumber + tweet.quoteTweetNumber }}
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
                  @click="likeTweet(tweet._id, index)"
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
              {{ tweet.likeNumber }}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tweets: {
      type: Array,
      default: [],
    },
    renderComponent: { type: Number, default: 0 },
    likeTweet: { type: Function },
    retweetTweet: { type: Function },
    quoteTweet: { type: Function },
    deleteTweet: { type: Function },
  },
  computed: {
    watchTweets() {
      return this.renderComponent;
    },
    watchQuoteClosers() {
      return this.$store.state.showQuoteModal;
    },
    watchDeleteModalCloser() {
      return this.$store.state.showDelete;
    },
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
  },
  watch: {
    watchTweets() {
      console.log("yes");
      // return this.tweets.map((x) => x.toggleLike);
    },
    watchDeleteModalCloser() {
      if (this.$store.state.showDelete === false) this.showDelete = false;
    },
    watchQuoteClosers() {
      if (this.$store.state.showQuoteModal === false) {
        this.showQuoteModal = false;
        this.$store.commit("setQuoteModal", true);
      }
    },
  },
  data() {
    return {
      showTweetOptions: false,
      number: 0,
      showQuoteModal: false,
      tweetText: "",
      quotedTweet: {},
      showOptions: false,
      showDelete: false,
      tweetId: "",
      user: this.$store.state.user,
    };
  },
  mounted() {
    console.log(this.tweets)
    // this.resize();
    // this.tweets.map((x) => this.showTweetOptions.push(false));
  },
  methods: {
    formatDate(dateString) {
      const dt = new Date(dateString);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      const newdt = new Date(dt).toISOString();
      const holder = newdt.slice(0, 19);
      const dateArr = holder.split("T");
      const date = dateArr[0].split("-");
      const months = parseInt(date[1]);
      const timeString = dateArr[1].split(":");
      if (months == currentMonth && date[2] == currentDate) {
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        // console.log(
        //   currentHour,
        //   timeString[0], (parseInt(currentHour) - parseInt(timeString[0] + 1)),
        //   parseInt(currentMinute) - parseInt(timeString[1])
        // );
        if (currentHour > timeString[0])
          return `${currentHour - parseInt(timeString[0])}h`;
        else return `${Math.abs(currentMinute - parseInt(timeString[1]))}m`;
      }
      const numMonth = parseInt(months) - 1;
      const dayString = `${this.months[numMonth]} ${date[2]} ${
        currentYear == date[0] ? "" : `, ${date[0]}`
      }`;

      return `${dayString}`;
    },
    resize() {
      let element = this.$refs["textarea"];

      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
  },
};
</script>

<style scoped>
.tweet {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 2rem;
}
.profile_pic {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 50%;
  border: 1px solid rgba(128, 128, 128, 0.244);
}

.engagement-icons {
  fill: rgb(113, 118, 123);
  height: 16px;
  width: 16px;
}

.tweet {
  margin-top: 0;
  /* border-top: 0.1px solid #e2e2ea37; */
  border-bottom: 0.1px solid #e2e2ea37;
  /* padding-top: 1rem; */
  padding: 1rem 16px;
}
.tweet-user-details {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
}
.grey-text {
  color: rgb(113, 118, 123);
}

.text {
  color: rgb(231, 233, 234);
  word-wrap: break-word;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
}
.engagements {
  display: flex;
  width: 85%;
  justify-content: space-between;
  margin-top: 1rem;
}
.tweet-container {
  width: 100%;
}
.icon-flex {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  color: rgb(113, 118, 123);
}
.comments:hover {
  color: blue;
}
.comments:hover svg {
  fill: blue;
}
.svg-container {
  padding: 10px 10px 5px 10px;
  border-radius: 50%;
}
.comments:hover .svg-container,
.retweets:hover .svg-container,
.likes:hover .svg-container,
.more:hover .svg-container {
  background-color: rgba(255, 255, 255, 0.083);
}
.retweets:hover {
  color: rgb(1, 196, 1);
}
.retweet-icon {
  fill: rgb(1, 196, 1);
}
.retweets:hover svg {
  fill: rgb(1, 196, 1);
}
.like-icon {
  fill: rgb(255, 75, 105);
}
.likes:hover {
  color: rgb(255, 75, 105);
}
.likes:hover svg {
  fill: rgb(255, 75, 105);
}
.tip:hover {
  color: rgb(186, 0, 186);
}
.retweets {
  position: relative;
}
.more:hover svg {
  fill: rgb(17, 128, 255);
}
.tweet-options {
  position: absolute;
  border: 1px solid black;
  /* padding:3rem; */
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
    rgb(255 255 255 / 15%) 0px 0px 3px 1px;
  background: black;
  top: 0rem;
  left: -10rem;
  z-index: 10;
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
.retweets:hover .tweet-options div,
.retweets:hover .tweet-options div svg,
.more:hover .more-options div svg {
  color: rgb(113, 118, 123);
  fill: rgb(113, 118, 123);
}
.modal-body {
  background: rgba(91, 112, 131, 0.048);
  /* align-items: center;
 justify-content: center; */
  /* padding-top:10rem; */
}
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.more {
  position: relative;
}
.more-options {
  position: absolute;
  border: 1px solid black;
  /* padding:3rem; */
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
    rgb(255 255 255 / 15%) 0px 0px 3px 1px;
  background: black;
  top: 0rem;
  right: 0rem;
  z-index: 10;
  min-width: max-content;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
}
.engagement-icons .more-icon {
  height: 18px;
  width: 18px;
}
.more-options div .delete,
.more-options div:hover svg.delete {
  color: red;
  fill: red;
}
.modal-container {
  padding: 2rem;
}
.modal-container h1 {
  font-size: 24px;
  margin-bottom: 1rem;
}
.modal-container p {
  color: rgba(210, 210, 210, 0.479);
  font-size: 16px;
  margin-bottom: 1rem;
}
.delete-btn {
  width: 100%;
  padding: 1rem;
  border: 1px solid white;
  color: white;
  font-size: 15px;
  margin-bottom: 1rem;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
}
.red {
  background: red;
  border: none;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>