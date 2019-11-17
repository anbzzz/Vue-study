<template>
  <div class="goodsinfo-container">
    <transition 
    @before-enter='beforeEnter'
    @enter='enter'
    @after-enter='afterEnter'
    >
      <div class="ball" v-show="ballFlag" ref="ball">{{selectCount}}</div>
    </transition>

    <!-- 图片区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swaper :lunbotuList="lunbotuList" :isFull="false"></swaper>
        </div>
      </div>
    </div>
    <!-- 购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <numbox @getcount="getSelect"  :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}</p>
          <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComm(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swaper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      goodsinfo: {},
      ballFlag: false ,
      selectCount: 1  // 默认选中一个
    };
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    getLunbo() {
      this.$http.get(`api/getthumimages/${this.id}`).then(result => {
        if (result.body.status == 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get(`api/goods/getinfo/${this.id}`).then(result => {
        if (result.body.status == 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    }, // 使用编程式导航
    goDesc(id) {
      //
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComm(id) {
      this.$router.push({ name: "goodscomm", params: { id } });
    },
    addToShopCar(){
      this.ballFlag = !this.ballFlag ;
    },
    getSelect(count){
      this.selectCount = count ;
      // console.log(count)
    },
    beforeEnter(el){
      el.style.transform = 'translate(0,0)'
    },
    enter(el,done){
      el.offsetWidth ;

      //获取小球在页面中的位子
      const ballPostion = this.$refs.ball.getBoundingClientRect() ;
      // dom 操作 不区分组件 可以拿到任意dom 元素
      // 获取徽标位置
      const badgePostion = document.getElementById('badge').getBoundingClientRect()  ;

      const  xDist = badgePostion.left - ballPostion.left ;
      const yDist = badgePostion.top - ballPostion.top ;

      el.style.transform= `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = 'all .8s cubic-bezier(.4,-0.3,1,.58)'
      done() ;
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag ;
    }

  },
  components: {
    swaper,
    numbox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;

    button {
      margin: 15px 0;
    }
  }
  .ball{
    width: 15px ;
    height: 15px;
    border-radius: 50% ;
    position: absolute ;
    z-index: 99 ;
    background-color: #f40 ;
    top: 410px;
    left: 140px;

    color: white ;
    text-align: center ;
    line-height: 15px;
    font-size: 14px;
  }
}
</style>



