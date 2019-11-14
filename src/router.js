import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MenberContainer from "./components/tabbar/MemberContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"

import NewList from './components/news/NewList.vue'
import NewInfo from './components/news/NewInfo.vue'

import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'

import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
var router =  new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component: HomeContainer},
    {path:'/member',component: MenberContainer},
    {path:'/shopcar',component: ShopcarContainer},
    {path:'/search',component: SearchContainer},
    {path:'/home/newlist',component: NewList},
    {path:'/home/newinfo/:id',component: NewInfo},
    {path:'/home/photolist',component: PhotoList},
    {path: '/home/photoinfo/:id',component: PhotoInfo},
    {path:'/home/goodslist',component:  GoodsList},
    {path: '/home/goodsinfo/:id',component: GoodsInfo,name:'goodsinfo'},
    {path:'/home/goodsdesc/:id',component: GoodsDesc ,name:'goodsdesc'},
    {path:'/home/goodscomm/:id',component: GoodsComment,name:'goodscomm'}

  ],
  linkActiveClass:"mui-active"  // 覆盖路由高亮的类  router-link-active
})

// 把路由对象暴露出去
export default router