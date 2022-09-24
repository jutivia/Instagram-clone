<template>
  <div :class="{ loader: true, centralized: centralized }" />
</template>

<script>
export default {
  props: {
    centralized: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style scoped>
.loader {
  margin-top: 0;
  border: 3px solid rgb(29, 155, 240);
  /* background: rgb(29, 155, 240); */
  border-radius: 50%;
  border-top: 3px solid #000;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 0.5s linear infinite;
  animation: spin 0.5s linear infinite;
}
.loader.centralized {
  margin: 10px auto;
  margin-top: 12px;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>