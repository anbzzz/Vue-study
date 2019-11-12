<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newInfo.title}}</h3>
    <p class="subtitle">
       <span>发表时间：{{newInfo.add_time | dateFormat}}</span>
       <span>点击：{{newInfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newInfo.content"></div>
     <!-- 评论区 -->
    <comment :id='this.id'></comment>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import comment from '../subcomponents/comment.vue'
export default {
  data(){
    return {
      id: this.$route.params.id ,
      newInfo : [] 
    }
  },
  created(){
    this.getNewInfo() ;
  },
  methods:{
    getNewInfo(){

      console.log("111111");
      this.$http.get("api/getnew/"+this.id,).then((data)=>{
        if(data.body.status == 0){
          this.newInfo = data.body.message[0] ;
          console.log(this.newInfo) ;
        }else{
          Toast("获取详情失败");
          console.log("dfasdf");
        }
      })
    }
  },
  components:{
    comment
  }
  
}
</script>
<style lang="scss"> 
// scoped 图片显示存在问题
  .newsinfo-container{
    padding:0 4px;

    .title{
      font-size: 16px;
      text-align: center;
      margin: 15px 0 ;
      color: red ;

    }
    .subtitle{
      font-size: 13px;
      color: #226aff ;
      display: flex;
      justify-content: space-between ;
    }
    img{
      width: 100%;
      height: 100% ;
    }
    .content{
      padding: 0 4px;
    }
  }
</style>
