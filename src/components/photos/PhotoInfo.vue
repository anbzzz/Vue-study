<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr>
     <!-- 缩略图区域 -->
    <!-- <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
    </div> -->   
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '80px', height: '80px', margin: '5px'}"
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
    />

    <!-- 图片内容区 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论区域 -->
    <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
  data(){
    return {
      id: this.$route.params.id ,
      photoinfo : '',
      list:[]

    }
  },
  created(){
    this.getPhotoInfo() ;
    this.getThumbs() 
  },
  methods:{
    getPhotoInfo(){
      this.$http.get('api/getimageInfo/'+this.id).then((result)=>{
        if(result.body.status == 0){
          this.photoinfo = result.body.message[0] ;
        }
      })
    },
    getThumbs(){
      this.$http.get("api/getthumimages/"+ this.id) .then((result)=>{
        if(result.body.status == 0){
           result.body.message.forEach(item=>{
            item.w = 600 ;
            item.h = 400 ;
          }) ;
          this.list = result.body.message ;
        }
      })
    }
  },
  components :{
    comment
  }
  
}
</script>
<style lang="scss" scoped>
 .photoinfo-container{
   padding: 5px;

   h3{
     color: #26a2ff;
     font-size: 15px ;
     text-align: center ;
     margin: 15px 0 ;
   }
   .subtitle{
     display: flex ;
     justify-content: space-between ;
     font-size: 13px ;
   }
   .content{
     font-size: 13px;
     line-height: 30px;
   }
 }
</style>

