<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-duration="800"
      success-text="刷新成功"
    >
      <!-- 组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。
      此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item v-for="item in list" :key="item.art_id" :item="item">
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">
import { getUserChannelArtiles } from '@/api/user.js'
import ArticleItem from '@/components/articleItem.vue'
export default {
  name: 'ArticleList',
  data () {
    return {
      // 通过时间戳来判断是否是还有数据 请求新的推荐数据传入指定的时间戳 请求最新数据使用当前时间戳
      timestamp: null,
      list: [],
      loading: false,
      finished: false, // 完成加载没数据了
      refreshing: false, // 下拉刷新loading，
      with_top: 1 // 1 包含置顶 0 不包含置顶 是否包含置顶文章
    }
  },
  props: {
    channel: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  methods: {
    // list初始化加载 上拉加载
    async onLoad () {
      const params = {
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // new Date().getTime(), // Date.now()
        with_top: this.with_top // 1 包含置顶 0 不包含置顶 是否包含置顶文章
      }
      const res = await getUserChannelArtiles(params)
      const { results } = res.data
      if (results.length) { // 判断是否最后
        this.timestamp = res.data.pre_timestamp // 最后一页的时间戳
        this.list.push(...results)
      } else {
        // 没有数据之后
        this.finished = true
      }
      this.loading = false
    },
    // 下拉刷新 会自动开启loading
    async onRefresh () {
      // 下拉刷新永远传最新时间戳
      this.timestamp = Date.now()
      const params = {
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // new Date().getTime(), // Date.now()
        with_top: this.with_top // 1 包含置顶 0 不包含置顶 是否包含置顶文章
      }
      // 请求获取数据
      const res = await getUserChannelArtiles(params)
      const { results } = res.data
      if (results.length) { // 判断是否最后
        this.timestamp = res.data.pre_timestamp // 最后一页的时间戳
        this.list.unshift(...results)
      } else {
        // 没有数据之后
        this.finished = true
      }
      this.refreshing = false
    }
  },
  computed: {

  },
  components: {
    ArticleItem
  },
  created () {
  }
}
</script>

<style scoped lang='less'>
.article-list-container {
  width: 100%;
  position: fixed;
  left:0;
  right: 0;
  top:90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
