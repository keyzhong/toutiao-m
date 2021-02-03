<template>
  <div class="home-container">
    <!-- 头部搜索 -->
      <van-nav-bar  class="app-nav-bar">
        <template #title>
          <van-button
            type='info'
            round
            class="search-btn"
            to='/search'
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
      <!-- 占位元素 -->
      <div slot='nav-right' class='block'></div>
      <div slot='nav-right' class='more-channels'>
        <van-icon  name="wap-nav" @click='showChannelList' />
      </div>
    </van-tabs>
    <!-- 标签导航 -->
    <!-- 文章列表 -->
    <!-- 文章列表 -->
    <!--弹出层-->
    <van-popup
    position="bottom"
    class='channel-edit'
    get-container="body"
    closeable
    round
    close-icon-position="top-left"
    :style='{height:"100%", top: "50px"}'
    v-model="showPopup">
      <channel-edit
        :activeIndex='active'
        :myChannelList='channelsList'
        @close = 'closePopup'
        @switchChannel='changeChannel'></channel-edit>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { getUserChannels } from '@/api/user.js'
import { getItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
import ArticleList from './components/articleList'
import ChannelEdit from './components/channelEdit'
export default {
  data () {
    return {
      active: 0,
      channelsList: [],
      showPopup: false
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
    },
    // 展示弹出层
    showChannelList () {
      this.showPopup = true
    },
    changeChannel (index) {
      this.active = index
    },
    closePopup () {
      this.showPopup = false
    }
  },
  computed: {
    ...mapState(['user']),
    channelsListLength () {
      return this.channelsList.length
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    const myChannels = getItem('myChannels') || []
    if (this.user) { // 已登录
    } else if (myChannels.length) { // 未登陆 本地有
      this.channelsList = myChannels
    } else { // 未登录 本地无
      this.loadChannelList()
    }
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
    position: relative;
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
    .block{
      flex-shrink: 0;
      width: 33px;
    }
    .more-channels{
      position: fixed;
      top:46px;
      right: 0;
      font-size: 24px;
      height: 43px;
      background: rgba(255,255,255,.9);
      display: flex;
      align-items: center;
      justify-content: center;
      .van-icon{
        font-size: 24px;
      }
      &::before{

        position: absolute;
        top:7px;
        left:-5px;
        content: '';
        width: 1px;
        height: 29px;
        background: #ccc;
      }
    }
  }
}
</style>
