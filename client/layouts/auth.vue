<template>
  <div class="default-ctn">
    <div>
      <SideBar />
    </div>
    <div class="middle">
      <div class="main-content">
        <Nuxt />
      </div>
    </div>
    <div class="rhs">
      <Search />
    </div>
  </div>
</template>

<script>
export default {
  name: "auth",
  data() {
    return {};
  },
  created() {
    // console.log(this.$store);
    this.isUserTokenStored();
  },
  methods: {
    isUserTokenStored() {
      if (this.$store.state.token === undefined) {
        this.$toasted.error("UnAuthorized User").goAway(3000);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.default-ctn {
  display: flex;
  overflow-x: hidden;
}

.middle {
  margin-left: 120px;
  width: calc(100% - 120px);
}

.showSidebar {
  display: block;
}
.main-content {
  width: 600px;
  min-width: 100%;
}
.rhs{
  width:60%;
}
@media only screen and (min-width: 1400px) {
  .middle {
    margin-left: 320px;
    width: calc(100% - 320px);
  }
}
@media only screen and (max-width: 720px) {
  .main-content {
    min-width: 100%;
  }
}
@media only screen and (max-width: 600px) {
  .main-content {
    width:100%;
  }
}
</style>