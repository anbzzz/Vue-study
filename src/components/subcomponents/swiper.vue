<template>
  <div>
    <!-- lunbotuList 是传递的 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
        <img :src="item.img" :class="{full: isFull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["lunbotuList", "isFull"]
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

// 为子元素添加样式的一种方式
  .mint-swipe-item {
    // &:nth-child(1) {
    //   background: red;
    // }
    // &:nth-child(2) {
    //   background: blue;
    // }
    // &:nth-child(3) {
    //   background: cyan;
    // }
    text-align: center ;
  }

  img {
    height: 100%;
    
  }
  .full {
    width: 100%;
  }
}
</style>
