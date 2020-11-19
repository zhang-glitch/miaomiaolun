import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "/api";

axios.interceptors.request.use(config => {
  let token = localStorage.getItem("token");
  config.headers.common.Authorization = `Bearer ${token}`;
  // store.state.loading = true;

  store.commit("setLoading", true);
  return config;
});

axios.interceptors.response.use(
  config => {
    // console.log(config);
    const status = config.status;
    const result = config.data;
    if (status === 200) {
      // 请求成功关闭loading
      // store.state.loading = false;
      store.commit("setLoading", false);
      return result;
    }
  },
  err => {
    // store.state.loading = false;
    store.commit("setLoading", false);
    // 错误处理
    // console.log("error", error.response);
    const { error } = err.response.data;
    store.commit("handleErr", { isError: true, message: error });
    return Promise.reject(error);
  }
);

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
