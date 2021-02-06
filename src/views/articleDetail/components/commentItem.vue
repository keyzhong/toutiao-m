<template>
  <div class="comment-item-container">
    <van-cell class='comment-item'>
      <div slot='title' class='title'>
        <div class="name">{{item.aut_name}}</div>
        <div class="content">{{item.content}}</div>
      </div>
      <van-image
          fit="cover"
          slot="icon"
          width='33'
          height='33'
          class="avatar"
          round
          :src="item.aut_photo"
        ></van-image>
        <div slot='label' class='label-wrap'>
          <div>{{item.pubdate | datetime('MM-DD HH:mm')}}</div>
          <van-button size='mini' round @click="$emit('replay-click', item)">回复 {{item.reply_count}}</van-button>
        </div>
        <div class='right' @click='onLike'>
          <van-icon
          color='pink'
          slot='right-icon'
          :name='item.is_liking ? "good-job" : "good-job-o"'
          ></van-icon>
          <span>{{item.like_count}}</span>
        </div>
    </van-cell>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {

    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onLike () {
      const isLike = this.item.is_liking
      if (isLike) {
        this.item.like_count--
      } else {
        this.item.like_count++
      }
      this.item.is_liking = !this.item.is_liking
    }
  },
  computed: {

  },
  components: {

  },
  created () {
  }
}
</script>

<style scoped lang='less'>
.comment-item-container{
  .comment-item{
    /deep/ .van-cell__value{
      flex:unset
    }
  }
  .title{
    .name{}
    .content{}
  }
  .avatar{
    margin-right:10px;
    width: 33px;
    height: 33px;
  }
  .label-wrap{
    vertical-align: middle;
    display: flex;
    align-items: center;
    .van-button{
      margin-left:5px;
      padding:5px 10px;
    }
  }
  .right{
    display: flex;
    align-items: center;
    /deep/.van-icon{
      font-size: 16px;
      margin-right:3px;
    }
  }
}
</style>
