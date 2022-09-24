<template>
  <div class="container">
    <div class="main">
      <div class="search">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
          <g>
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
            ></path>
          </g>
        </svg>
        <input type="search" placeholder="Search Twitter" v-model="search" />
        <div v-if="search.length" class="dropdown">
          <div v-if="!people.length" class="span">
            Try searching for people, topics, or keywords
          </div>
          <div v-else class="people">
            <div class="person" v-for="(person, index) in people" :key="index">
              <div class="profle-pic">
                <img :src="person.profilePic" class="profile_pic" />
              </div>
              <div class="user-details">
                <h4>{{ person.name }}</h4>
                <h6>{{ person.username }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="message-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      people: [
        {
          profilePic: "/home.svg",
          name: "jutivia",
          username: "jujuTheBlessed",
        },
        {
          profilePic: "/home.svg",
          name: "jutivia",
          username: "jujuTheBlessed",
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 480px;
  min-width: 360px;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 30px;
  background: transparent;
  overflow-x: hidden;
  z-index: 2;
  padding: 0 2rem;
  border-left: 1px solid #e2e2ea37;
  padding-top: 2rem;
}
.main {
  display: block;
}
.search {
  width: 95%;
  height: 3rem;
  background: rgba(255, 255, 255, 0.124);
  border-radius: 20px;
  padding: 10px 1rem;
  border: 1px solid rgba(255, 255, 255, 0.053);
  transition: all 0.1s ease;
  display: flex;
  align-items: center;
  position: relative;
}
.search input {
  height: 100%;
  width: 100%;
  background: transparent;
  padding: 0 1rem;
  border: none;
  color: rgb(231, 233, 234);
}
.search:focus-within {
  border: 1px solid rgb(29, 155, 240);
}
.search:focus-within .icon {
  fill: rgb(29, 155, 240);
}

.search input:focus {
  outline: none;
}
.icon {
  margin-right: 10px;
  fill: rgb(113, 118, 123);
  width: 1.5rem;
  height: 1.5rem;
}
.dropdown {
  position: absolute;
  top: 2.9rem;
  max-height: 70vh;
  min-width: 100%;
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
    rgb(255 255 255 / 15%) 0px 0px 3px 1px;
  z-index: 2;
  border-radius: 10px;
  height: auto;
  padding: 0rem 0;
}
.dropdown .span {
  color: rgb(113, 118, 123);
  font-size: 14px;
  margin: 2rem 2rem;
}
.person {
  display: flex;
  width: 100%;
  gap: 1.5rem;
  padding: 1rem 1rem;
}
.person:hover {
  background: rgba(255, 255, 255, 0.114);
}
.profile_pic {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  border-radius: 50%;
  border: 1px solid rgba(128, 128, 128, 0.244);
}
.user-details h4 {
  color: rgb(231, 233, 234);
  font-weight: 800;
  font-size: 16px;
}
.user-details h6 {
  color: rgba(210, 210, 210, 0.72);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
  margin-top: -3px;
  margin-left: 4px;
}
@media only screen and (max-width: 1050px) {
  .main {
    display: none;
  }
}
@media only screen and (max-width: 720px) {
  .container {
    display: none;
  }
}
</style>