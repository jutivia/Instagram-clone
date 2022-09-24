<template>
  <div
    class="tweet"
    @click="
      $router.push({
        path: './tweet-detail',
        query: { id: tweet.quotedTweetId },
      })
    "
  >
    <div class="profle-pic">
      <img
        :src="tweet.user.profilePic || '~/assets/images/home.svg'"
        class="profile_pic1"
      />
      <div class="tweeter">
        <div class="tweet-user-details">
          <span class="text">{{ tweet ? tweet.user.name : "User" }}</span>
          <span class="grey-text"
            >@{{ tweet ? tweet.user.userName : "Name" }}</span
          >
          <span class="dot"></span>
          <span class="grey-text">
            {{ tweet ? formatDate(tweet.createdAt) : "8h" }}
          </span>
        </div>
      </div>
    </div>
    <span
      v-if="tweet.tweetType === 'Comment'"
      style="color: rgb(113, 118, 123); marginTop: -1rem"
      >Replying to
      <span
        style="color: rgb(29, 155, 240); cursor: pointer"
        @click="$router.push('/profile')"
        >@{{ tweet.user.userName }}</span
      ></span
    >
    <div class="tweet-container">
      <div class="tweet-details">
        <div class="text">
          {{ tweet ? tweet.content : "content" }}
        </div>
        <!-- <div v-if="tweet.media" class="media">
          <img :src="tweet.image" alt="" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tweet: {
      type: Object,
      default: () => {},
    },
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
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return;
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
  },
};
</script>

<style scoped>
.tweet {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 2rem;
  border: 1px solid rgba(210, 210, 210, 0.111);
  border-radius: 20px;
}
.tweet {
  margin-top: 0;
  /* border-top: 0.1px solid #e2e2ea37; */
  /* border-bottom: 0.1px solid #e2e2ea37; */
  /* padding-top: 1rem; */
  padding: 1rem 16px !important;
}

.profile_pic1 {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
  border: 1px solid rgba(128, 128, 128, 0.244);
}
.tweet-user-details {
  display: flex;
  justify-content: flex-start;
  gap: 0.2rem;
  align-items: center;
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
.dot {
  margin: 0 2px;
}
.profle-pic {
  display: flex;
  gap: 20px;
}
</style>