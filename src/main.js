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

import Vuex from 'vuex'
Vue.use(Vuex)

// 初始化购物车
var car = JSON.parse(localStorage.getItem('car') || '[]') ;

var store = new Vuex.Store({
  state:{
    car: car // 购物车中的数据 {id,count,price,select}
  },
  mutations:{
    addToCar(state,goodsinfo){
      var flag = true ;
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count += parseInt( goodsinfo.count)
          flag = false ; 
          return true ;
        }
      })
      if(flag){
        state.car.push(goodsinfo) ;
      }

      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updatedGoodsInfo(state,goodsinfo) {
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count) 
          return true ;
        }
      })
      //保存本地
      localStorage.setItem('car',JSON.stringify(state.car)) 
    },
    removeFromCar(state,id){
      state.car.some((item,i)=>{
        if(item.id == id){
          state.car.splice(i,1) ;
          return true ;
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id == info.id){
          item.selected = info.selected  
          return true ;
        }
      })
       //保存本地
       localStorage.setItem('car',JSON.stringify(state.car)) 
    }
  },
  getters:{
    getAllCount(state){
      var c = 0;
      state.car.forEach((item)=>{
        c += item.count ;
      })
      return c ;
    },
    getGoodsCount(state){
      var o = {} ;
      state.car.forEach(item=>{
        o[item.id] = item.count ;
      })
      return o ;
    },
    getGoodsSelected(state){
      var o = {} 
      state.car.forEach(item=>{
        o[item.id] = item.selected ;
      }) 
      return o ;
    },
    getGoodsCountAndAmount(state){
      var o = {
        count: 0 ,
        amount: 0
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count 
          o.amount += item.count * item.price
        }
      })
      return o ;
    }
  }
})

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
  router,
  store
})
