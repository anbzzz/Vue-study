<template>
  <div class="cmt-container">
    <h2>发表评论</h2>
    <hr />
    <textarea name id maxlength="120" placeholder="请输入要BB的内容（做多吐槽120字" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i ) in comments " :key="i">
        <div class="cmt-title">第{{i+1}}楼 &nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time| dateFormat}}</div>
        <div class="cmt-body">{{item.content == ''? '此用户很懒，嘛都没有说':item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      msg: "",
      comments: [],
      pageindex: 1
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    // 获取评论
    getComments() {
      this.$http
        .get(`api/getcomments/${this.id}?pageindex=${ this.pageindex }`)
        .then(data => {
          if (data.body.status == 0) {
            this.comments = this.comments.concat(data.body.message);
            console.log(this.comments);
          } else {
            console.log(data);
            Toast("获取评论失败!");
          }
        });
    },
    // 查看更多
    getMore() {
      this.pageindex ++ 
      this.getComments();
      console.log("11111");
    },
    // 发表评论
    addComment(){
      if(this.msg.trim().length == 0){
        Toast("评论内容为空")
        return ;
      }
      this.$http.post(`api/postcomment/${this.id}`,{content: this.msg.trim() }).then((result)=>{
        if(result.body.status == 0){
          this.comments.unshift({
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim() 
          })
          this.msg =''
        }else{
          Toast("哦豁，评论走丢了")
        }
      })

    }
  },
  props: ["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 13px;
  }
  textarea {
    font-size: 14px;
    height: 85px;

    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      .cmt-title {
        background-color: #ccc;
        font-size: 13px;
        line-height: 30px;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>


