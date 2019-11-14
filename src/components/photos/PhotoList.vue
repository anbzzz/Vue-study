<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active':'' ]"
            href="#item2mobile"
            data-wid="tab-top-subpage-2.html"
            v-for="item in cates"
            :key="item.id"
            @click=" getImgList(item.id)"
          >{{item.title}}</a> 
           <!-- @click=" getImgList(item.id)"  如果出现错误 可使用  @tap=" getImgList(item.id)" 只有MUI 可以使用这个指令-->
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link v-for="item in imglist" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [],
      imglist: []
    };
  },
  methods: {
    getAllCatesgory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status == 0) {
          this.cates = result.body.message;
          this.cates.unshift({ title: "全部", id: 0 });
        }
      });
    },
    getImgList(cateId) {
      this.$http.get(`api/getimages/${cateId}`).then(result => {
        if (result.body.status == 0) {
          this.imglist = result.body.message;
        }
      });
    }
  },
  created() {
    this.getAllCatesgory();
    this.getImgList(0); // 默认请求所有
  },
  mounted() {
    // dom 结构被渲染好后   会执行这个函数 保证元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  text-align: center;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    list-style: none;
    background-color: #ccc;
    margin-bottom: 10px;
    box-shadow: 0 0  6px;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info{
      position: absolute;
      bottom: 0 ;
      background-color: rgba(0,0,0,0.4) ;
      text-align: left ;
      color: white ;
      max-height: 64px;
      .info-title{
        font-size: 14px;
      }
      .info-body{
        font-size: 13px;
      }
      
    }
  }
}
</style>
