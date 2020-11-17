import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "/api";

axios.interceptors.response.use(config => {
  // console.log(config);
  const status = config.status;
  const result = config.data;
  const msg = config.data.msg;
  if (status === 200) {
    return result;
  } else {
    return Promise.reject(msg);
  }
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
