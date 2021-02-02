<template>
  <div class="home-container">
    <!-- 头部搜索 -->
      <van-nav-bar  class="app-nav-bar">
        <template #title>
          <van-button
            type='info'
            round
            class="search-btn"
            icon='search'>搜索</van-button>
        </template>
      </van-nav-bar>
    <!-- 头部搜索 -->

    <!-- 标签导航 -->
      <!-- 标签页组件有一个功能 只有第一次查看才会渲染里面的内容 -->
    <van-tabs  class='channel-tabs' v-model="active" sticky border v-if='channelsListLength' >
      <van-tab
        class="tab-item"
        :title="item.name"
        v-for='(item) in channelsList'
        :key='item.id'
        >
        <article-list :channel='item'>
        </article-list>
      </van-tab>
    </van-tabs>
    <!-- 标签导航 -->
    <!-- 文章列表 -->
    <!-- 文章列表 -->
  </div>
</template>

<script type="text/ecmascript-6">
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/articleList'
export default {
  data () {
    return {
      active: 0,
      channelsList: []
    }
  },
  props: {

  },
  methods: {
    async loadChannelList () {
      try {
        const { data } = await getUserChannels()
        this.channelsList = data.channels
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    channelsListLength () {
      return this.channelsList.length
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadChannelList()
  }
}
</script>

<style scoped lang='less'>
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: unset;
  }
  .search-btn{
    height: 32px;
    width:277px;
    background: #5babfb;
    border:none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text{
      font-size: 14px;
    }
  }
  .channel-tabs{
    /deep/ .van-tab{
      border-right:1px solid #eee;
      border-bottom:1px solid #eee;
    }
    /deep/ .van-tabs__line{
      width:15px;
      height: 3px;
      background: #3296fa;
      bottom:20px;
    }
    .tab-item{

    }
  }
}
</style>
