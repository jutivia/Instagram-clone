<template>
  <div class="error-text">
    Uh oh, an error was encountered
    <h6 @click="reload()">Try again</h6>
  </div>
</template>

<script>
export default {
  props:{
    reload: {type: Function}
  }
};
</script>

<style scoped>
.error-text {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  margin: 0 auto;
}
.error-text h6 {
  color: rgba(210, 210, 210, 0.479);
  font-size:14px;
  cursor: pointer;
}
</style>