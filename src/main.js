import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRource from 'vue-resource'

import { Header,Swipe, SwipeItem  } from 'mint-ui';

import router from './router.js';

Vue.use(VueRouter);
Vue.use(VueRource)

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import App from './App.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
var vm = new Vue({
  el:"#app",
  render:c => c(App),
  router
})
