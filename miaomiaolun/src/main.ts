import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "/api";

axios.interceptors.request.use(config => {
  // store.state.loading = true;

  store.commit("setLoading", true);
  return config;
});

axios.interceptors.response.use(config => {
  // console.log(config);
  const status = config.status;
  const result = config.data;
  const msg = config.data.msg;
  if (status === 200) {
    // 请求成功关闭loading
    // store.state.loading = false;
    store.commit("setLoading", false);
    return result;
  } else {
    // store.state.loading = false;
    store.commit("setLoading", false);
    return Promise.reject(msg);
  }
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
