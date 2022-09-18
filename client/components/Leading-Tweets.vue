<template>
  <div class="tweets">
    <div
      class="tweet"
      v-for="(tweet, index) in tweets"
      :key="index"
      @click="
        tweet.isComment
          ? $router.push('./sub-comment-thread')
          : $router.push('./tweet-detail')
      "
    >
      <div class="profile-pic">
        <img src="~/assets/images/home.svg" class="profile_pic" />
        <div class="line"></div>
      </div>
      <div class="tweet-container">
        <div class="tweet-user-details">
          <span class="text">{{ tweet.user.name }}</span>
          <span class="grey-text">{{ tweet.user.userName }}</span>
          <span class="dot"></span>
          <span class="grey-text"> {{ tweet.time }} </span>
        </div>
        <span
          v-if="tweet.isComment"
          style="color: rgb(113, 118, 123); marginleft: 4rem"
          >Replying to
          <span
            style="color: rgb(29, 155, 240); cursor: pointer"
            @click="$router.push('./profile')"
            >{{ tweet.postAuthor }}</span
          ></span
        >
        <div class="tweet-details">
          <div class="text">{{ tweet.content }}</div>
          <div v-if="tweet.media" class="media">
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
              {{ tweet.comments }}
            </div>
            <div class="icon-flex retweets">
              <div class="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="engagement-icons retweet-icon"
                >
                  <g>
                    <path
                      d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
                    ></path>
                  </g>
                </svg>
              </div>
              {{ tweet.retweets }}
            </div>
            <div class="icon-flex likes">
              <div class="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="engagement-icons like-icon"
                >
                  <g>
                    <path
                      d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
                    ></path>
                  </g>
                </svg>
              </div>
              {{ tweet.likes }}
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
  },
  data() {
    return {
      tweetContainer: [],
      line: [],
    };
  },
  activated() {
    console.log("activated");
  },
  mounted() {
    console.log("mounted");

  },
  methods: {
    lineHeight(index) {
      const id = "tweetContainer_" + index;
      const tweetContainer = document.getElementById(id);
      console.log("height", tweetContainer.style.height);

      //   let element = this.$refs["line"];
      //   const tweetContainer = this.$refs["tweetContainer"];
      //   element.style.height = tweetContainer.style.height;
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
  /* border-bottom: 0.1px solid #e2e2ea37; */
  /* padding-top: 1rem; */
  padding: 1rem 2rem;
  height: max-content;
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
  padding: 10px;
  border-radius: 50%;
}
.comments:hover .svg-container,
.retweets:hover .svg-container,
.likes:hover .svg-container {
  background-color: rgba(255, 255, 255, 0.083);
}
.retweets:hover {
  color: rgb(1, 196, 1);
}
.retweets:hover svg {
  fill: rgb(1, 196, 1);
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
.profile-pic {
  height: inherit;
  display:flex;
  flex-direction:column;
  align-items: center;
  gap:.5rem;
  /* border:1px solid red; */
  /* padding:2rem; */
}
.line {
  min-height: 48px;
  background: rgb(113, 118, 123);
  /* background:yellow ; */
  width: 1px;
  height:100%;
  /* left: 24px;
  top: 55px; */
}
</style>