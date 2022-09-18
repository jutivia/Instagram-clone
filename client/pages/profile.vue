<template>
  <div class="main-container">
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
      <div class="dets">
        <h1>{{ user.name }}</h1>
        <h6>{{ user.tweetNumber }} tweets</h6>
      </div>
    </div>
    <div class="header-images">
      <img :src="user.backdrop" alt="" class="backdrop" />
      <img :src="user.display_pic" alt="" class="displayPic" />
      <div v-if="user.ownProfile" class="buttons">
        <button class="edit">Edit profile</button>
      </div>
      <div v-else class="buttons">
        <div class="svg-circle">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class=""
            style="fill: rgb(239, 243, 244); height: 20px; width: 20px"
          >
            <g>
              <path
                d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"
              ></path>
            </g></svg
          ><span
            class="css-901oao css-16my406 css-1hf3ou5 r-poiln3 r-a023e6 r-rjixqe r-bcqeeo r-qvutc0"
          ></span>
        </div>
        <button class="follow">Follow</button>
      </div>
      <div class="user-texts">
        <h1 class="name">{{ user.name }}</h1>
        <h6>@{{ user.username }}</h6>
        <h4>{{ user.bio }}</h4>
        <div class="user-icons">
          <div class="svg-box">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              style="fill: rgb(113, 118, 123); height: 20px; width: 20px"
            >
              <g>
                <path
                  d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"
                ></path>
                <path
                  d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"
                ></path>
              </g>
            </svg>
            {{ user.location }}
          </div>
          <div class="svg-box">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              style="fill: rgb(113, 118, 123); height: 20px; width: 20px"
            >
              <g>
                <path
                  d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"
                ></path>
                <circle cx="7.032" cy="8.75" r="1.285"></circle>
                <circle cx="7.032" cy="13.156" r="1.285"></circle>
                <circle cx="16.968" cy="8.75" r="1.285"></circle>
                <circle cx="16.968" cy="13.156" r="1.285"></circle>
                <circle cx="12" cy="8.75" r="1.285"></circle>
                <circle cx="12" cy="13.156" r="1.285"></circle>
                <circle cx="7.032" cy="17.486" r="1.285"></circle>
                <circle cx="12" cy="17.486" r="1.285"></circle>
              </g>
            </svg>
            Joined {{ user.dob }}
          </div>
        </div>

        <div class="followings">
          <span
            >{{ user.following }}
            <span class="small_text">Following</span></span
          >
          <span
            >{{ user.followers }}
            <span class="small_text">Followers</span></span
          >
        </div>
      </div>
      <div class="">
        <div ref="buttons" class="tab-header-ctn">
          <button
            v-for="(item, id) of data"
            :id="`btn-${id}`"
            :key="id"
            :class="activeTab === id ? 'active tab-btn' : 'tab-btn'"
            @click="event($event.srcElement, id)"
          >
            {{ item }}
            <img :src="item.svg" alt="" />
          </button>
        </div>
        <div class="children">
          <div v-if="activeTab === 0">
            <Tweets :tweets="tweets" />
          </div>
          <div v-if="activeTab === 1">
            <Tweets :tweets="tweets" />
          </div>
          <div v-if="activeTab === 2">
            <Tweets :tweets="tweets" />
          </div>
          <div v-if="activeTab === 3">
            <Tweets :tweets="tweets" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      activeTab: 0,
      index: 0,
      data: ["Tweets", "Tweets & replies", "Media", "Likes"],
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
      user: {
        following: "100k",
        followers: "200k",
        dob: "May 2009",
        location: "Nigeria",
        name: "jutivia.x",
        username: "jujuTheBlessed",
        tweetNumber: 102,
        backdrop: "",
        display_pic: "",
        bio: "This is a personalized bio. My name is bae. This is a personalized bio. My name is bae. This is a personalized bio. My name is bae.",
      },
    };
  },
  methods: {
    event(_ev, tab) {
      this.$emit("tab", tab);
      this.activeTab = tab;
      this.index = tab;
    },
    goBack() {
      this.$router.go(-1);
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
  padding: 10px;
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
  padding: 0 3rem;
  padding-top: 7rem;
  align-items: center;
}
.dets h6,
.user-texts h6,
.small_text {
  font-size: 13px;
  color: rgb(113, 118, 123);
  line-height: 16px;
  margin-top: 2px;
  margin-left: 2px;
}
.header-images {
  padding-top: 5.7rem;
  width: 100%;
  display: relative;
}
.backdrop {
  width: 100%;
  height: 200px;
  object-fit: contain;
}
.displayPic {
  height: 135px;
  width: 135px;
  position: absolute;
  object-fit: contain;
  top: 225px;
  left: 20px;
  border-radius: 50%;
}
.edit,
.follow {
  width: auto;
  height: auto;
  padding: 0.5rem 2rem;
  border: 1px solid rgb(83, 100, 113);
  color: rgb(239, 243, 244);
  border-radius: 20px;
  font-weight: bold;
}
.follow {
  background: rgb(239, 243, 244);
  color: black;
}
.buttons {
  display: flex;
  position: absolute;
  top: 310px;
  right: 20px;
  gap: 1rem;
}
.name {
  font-weight: 800;
  color: rgb(239, 243, 244);
  margin-top: 6rem;
  font-size: 20px;
}
.user-texts {
  padding: 0 20px;
}
.user-texts h4 {
  margin-top: 1rem;
  color: rgb(231, 233, 234);
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
}
.svg-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(113, 118, 123);
}
.user-icons {
  display: flex;
  margin-top: 1rem;
  gap: 1.5rem;
}
.followings span:hover {
  text-decoration: underline;
  text-decoration-color: rgb(231, 233, 234);
  cursor: pointer;
}
.followings {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
.tab-header-ctn {
  position: relative;
  display: flex;
  justify-content: space-around;
  overflow-x: auto;
  width: 100%;
  border-bottom: 0.1px solid #e2e2ea37;
}
.tab-header-ctn::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #566ba018;
  content: "";
}
.tab-btn:active {
  background: transparent;
}
.tab-btn.active {
  color: inherit;
  border-color: rgb(29, 155, 240);
  border-bottom: 5px solid rgb(29, 155, 240);
  padding: 0 26px;
  margin: 0;
  border-radius: 3px;
}
.tab-btn {
  height: 60px;
  border: 0px;
  font-size: 1.05rem;
  background: transparent;
  color: rgb(113, 118, 123);
  margin-right: 12px;
  padding: 0 12px;
  transition: 0.3s;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .tab-btn {
    font-size: 0.775rem;
    padding: 0 6px;
  }
  .tab-btn.active {
    padding: 0 12px;
  }
}
.children {
  transition: all 0.5s ease-in-out;
}
.svg-circle {
  border: 1px solid rgb(83, 100, 113);
  padding: 10px;
  border-radius: 50%;
}
</style>