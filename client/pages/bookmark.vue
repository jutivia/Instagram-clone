<template>
  <div class="main-container">
    <div class="header-text">
      <h1>Bookmarks</h1>
      <span class="small_text">@{{ username }}</span>
    </div>
    <div class="tweet-container">
      <Tweets :tweets="tweets" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      loader: false,
      tweetText: "",
      username: "jujuTheblessed",
      tweets: [
        {
          user: {
            name: "Jutivia",
            userName: "@jujuTheBlessed",
          },
          time: "20hrs",
          content: "This is a rad tweet",
          likes: 10,
          retweets: 12,
          comments: 10,
        },
        {
          user: {
            name: "Jutivia",
            userName: "@jujuTheBlessed",
          },
          time: "20hrs",
          content: "This is a rad tweet",
          likes: 10,
          retweets: 12,
          comments: 10,
        },
        {
          user: {
            name: "Jutivia",
            userName: "@jujuTheBlessed",
          },
          time: "20hrs",
          content: "This is a rad tweet",
          likes: 10,
          retweets: 12,
          comments: 10,
        },
        {
          user: {
            name: "Jutivia",
            userName: "@jujuTheBlessed",
          },
          time: "20hrs",
          content: "This is a rad tweet",
          likes: 10,
          retweets: 12,
          comments: 10,
        },
      ],
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
.newTweet {
  width: 100%;
  /* border-bottom: 0.1px solid #e2e2ea37; */
  padding: 4rem 2rem;
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
.tweet-container {
  padding-top: 6rem;
}
.small_text {
  font-size: 13px;
  color: rgb(113, 118, 123);
  line-height: 16px;
  margin-left: 2px;
}
.header-text{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    gap:.2rem;
}
</style>