<template>
  <div class="shopcar-container">
    <!-- 列表区 -->
    <div class="goods-list" v-for="(item,i) in goodslist" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
            @change="selelctChangeed(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt />

            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid='item.id'></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count}}</span> 件，总计￥{{$store.getters.getGoodsCountAndAmount.amount}} <span class="red"></span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: []
    };
  },
  methods: {
    getGoodsList() {
      var ids = [];
      this.$store.state.car.forEach(item => {
        ids.push(item.id);
      });
      if (ids.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + ids.join(","))
        .then(reslut => {
          if (reslut.body.status == 0) {
            this.goodslist = reslut.body.message;
          }
        });
    },
    remove(id,index){
      // 删除表中数据
      this.goodslist.splice(index,1) ;
      // 删除本地数据
      this.$store.commit("removeFromCar",id) ;
    },
    selelctChangeed(id,val){
    this.$store.commit('updateGoodsSelected',{id:id,selected:val})
    }
  },
  created() {
    this.getGoodsList();
  },
  components: {
    numbox
  }
};
</script>
<style lang='scss' scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan{
    display: flex ;
    justify-content: space-between;
    align-items: center ;

    .red{
      color: red ;
      font-size: 16px;
    }
  }
}
</style>