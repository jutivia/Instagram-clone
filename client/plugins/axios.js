import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);
export default function ({ $axios, store }) {
  $axios.onError((error) => {
    const parsedError = error.response ? error.response.data.msg : error.message ? error.message :  null;
    console.log('parsed', parsedError);
    if (
      (parsedError &&
        parsedError.includes(
          "Cannot read properties of null (reading 'toLowerCase')"
        )) ||
      (parsedError && parsedError.includes("Network"))
    ) {
      Vue.toasted.error("Check your connection.").goAway(3000);
    } else {
      Vue.toasted.error(parsedError).goAway(3000);
    }
    // store.dispatch("dispatchError", parsedError);
  });

  $axios.onRequest((_config) => {
    $axios.setHeader("Authorization", `Bearer ${store.state.auth.token}`);
  });
}
