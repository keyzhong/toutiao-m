<template>
  <van-cell class='article-item'>
    <div slot='title'
      class='title van-multi-ellipsis--l3'>
      {{item.title}}
    </div>
    <div slot='label'>
      <div v-if = 'item.cover.type === 3' class='cover-wrap'>
        <van-image
          v-for='(val, index) in item.cover.images'
          :key = 'index'
          class='right-cover'
          fit='cover'
          :src='val'>
        </van-image>
      </div>
      <div class="label-wrap">
        <span>{{item.aut_name}}</span>
        <span>{{item.comm_count}}评论</span>
        <span>{{item.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if = 'item.cover.type === 1'
      class='right-cover'
      fit='cover'
      :src='item.cover.images[0]'>
    </van-image>
  </van-cell>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ArticleItem',
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
.article-item{

  .cover-wrap{
    padding:15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    /deep/ .van-image{
      &:not(:last-child) {
        padding-right:4px;
      }
    }
  }
  .label-wrap{
    font-size: 12px;
    color:#ccc;
    span{
      margin-right:12px;
    }
  }
  .title{
    font-size: 16px;
    color: #000;
    width: 100%;
  }
  .right-cover{
    width: 116px;
    height:73px;
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left:10px;
  }
  /deep/ .van-cell__title{
    width: 100%;
    word-break:break-all;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
