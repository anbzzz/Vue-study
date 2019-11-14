import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRource from 'vue-resource'

// import { Header,Swipe, SwipeItem,Button ,Lazyload } from 'mint-ui';

import MintUI from 'mint-ui'
Vue.use(MintUI) 
import 'mint-ui/lib/style.css'

import router from './router.js';
import VuePreview from 'vue2-preview' // 图片预览插件
Vue.use(VuePreview) 

Vue.use(VueRouter);
Vue.use(VueRource);
Vue.http.options.root ='http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON=true

// 第一全局过滤器
// 使用node 中的 moment 实现格式化时间 
import moment from 'moment'
Vue.filter("dateFormat",function (datestr,pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(datestr).format(pattern) ;
})


// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name,Button)
// Vue.use(Lazyload);


import App from './App.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
var vm = new Vue({
  el:"#app",
  render:c => c(App),
  router
})
