import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./index.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  })
  .mount("#app");
