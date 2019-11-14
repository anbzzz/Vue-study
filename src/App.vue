<template>
  <div class="my-container">
    <!-- header 区域 -->
    <mt-header fixed title="Vue项目"></mt-header>
    <!-- 中间的 router-view 区域 -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- tabbar 区域 -->

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-my" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
</script>


<style scope lang="scss">
.mint-header{
  z-index: 999;
}
.my-container {
   padding-top: 40px;
	padding-bottom: 50px;
  overflow-x: hidden ;
}

.v-enter{
  opacity: 0;
  transform: translateX(100%) ;

}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%) ;
    position: absolute;
}
.v-leave-active,
.v-enter-active{
  opacity: 1;
  transition: all .5s ease ;
}
// 改类名，修改无法切换的问题
.mui-bar-tab .mui-tab-item-my.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-my {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-my .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-my .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
