import { createApp } from 'vue'
import router from './router.js';
import App from './App.vue'

// import BootstrapVue3 from "bootstrap-vue-3";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const myV3App = createApp(App)
myV3App.use(router);
// myV3App.use(BootstrapVue3)

myV3App.mount('#app')
