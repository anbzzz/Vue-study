<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodsinfo/'+ item.id"
      tag="div"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热买中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->
    <!-- 跳转方式  
      1、 a 标签式跳转
      2、 window.location.href  编程式跳转
    -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热买中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http
        .get(`api/getgoods?pageindex=${this.pageindex}`)
        .then(result => {
          if (result.body.status == 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    getDetail(id) {
      // 用js 实现导航跳转 route 是路由参数对象   router 是路由导航对象  实现路由的前进 后退 以及跳转新的页面
      // this.$router.push("/home/goodsinfo/"+id) ;
      // 可以传递对象
      // { "/home/goodsinfo/"+id }
      // 传递匿名路由
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    .title {
      font-size: 14px;
    }
    img {
      width: 100%;
    }
    .info {
      background-color: rgba(192, 192, 192, 0.2);
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
