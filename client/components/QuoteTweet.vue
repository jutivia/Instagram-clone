<template>
  <div class="section">
    <div class="modal-container">
      <div class="header">
        <div @click="$store.commit('setQuoteModal', false)" class="close-body">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="close"
            style="color: rgb(239, 243, 244)"
          >
            <g>
              <path
                d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="step-container">
        <div class="newTweet">
          <div class="user">
            <div class="profile-pic">
              <img :src="user.profile" class="profile_pic" />
            </div>
            <div class="user-details">
              <textarea
                name=""
                id=""
                rows="10"
                class="text-area"
                v-model="tweetText"
                placeholder="Add a comment"
                @input="resize()"
                ref="textarea"
              />
              <Quoted-Tweet :tweet="tweet" />

              <div class="icons">
                <div class="first-row">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="tweet-icon"
                  >
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
                  @click="quoteTweet(tweetText, tweet._id, index ), (loader = true)"
                >
                  <span v-if="!loader">Tweet</span>
                  <Loader v-else />
                </button>
              </div>
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
    // user: {
    //   default: {},
    // },
    tweet: {
      default: {},
    },
    quoteTweet: { type: Function },
    index: { type: Number}
  },
  data() {
    return {
      showQuoteModal: false,
      tweetText: "",
      id: "",
      tweetId: "",
      loader: false,
      user: this.$store.state.user
    };
  },
  mounted() {
    this.resize();
    this.tweetId = this.tweet._id;
  },
  methods: {
    resize() {
      let element = this.$refs["textarea"];
      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
  },
};
</script>

<style scoped>
.newTweet {
  width: 100%;
  /* border-bottom: 0.1px solid #e2e2ea37; */
  padding: 0rem 16px;
  padding-bottom: 0rem;
}
.user {
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
  /* border-top: 0.1px solid #e2e2ea37; */
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
  min-height: 18px;
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
.modal-container {
  width: 40%;
}
.section {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>