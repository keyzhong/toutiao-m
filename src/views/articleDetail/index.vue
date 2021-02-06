<template>
  <div class="article-detail-container">
    <van-nav-bar
      title="文章详情"
      class="nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="view">
      <h1 class="title">
        {{ data.title }}
      </h1>
      <van-cell center class="author-wrap">
        <div slot="title" class="name">{{ data.aut_name }}</div>
        <van-image
          fit="cover"
          slot="icon"
          class="avatar"
          round
          :src="data.aut_photo"
        ></van-image>
        <div slot="label">{{ data.pubdate | relativeTime }}</div>
        <van-button
          round
          :type="data.is_followed ? 'default' : 'info'"
          size="small"
          :icon="data.is_followed ? ' ' : 'plus'"
          @click="onFollow"
          :loading="isLoading"
          >{{ data.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>
      <div
        class="content markdown-body"
        v-html="data.content"
        ref="articleContent"
      ></div>
      <van-divider>正文结束</van-divider>
      <!-- 文章评论   -->

      <comment-list
        @update-total-count="totalCount = $event"
        :source="id"
        type="a"
        ref="commentListCom"
        @replay-click="onReplyClick"
      ></comment-list>

      <!-- <van-cell>{{abc}}</van-cell> -->
      <van-tabbar route center class="footer">
        <div class="comment-btn">
          <van-button round block size="small" @click="commentPlain = true"
            >写评论</van-button
          >
        </div>
        <van-tabbar-item
          icon="comment-o"
          :badge="totalCount"
          to="/"
        ></van-tabbar-item>
        <van-tabbar-item
          :loading="collectLoading"
          :class="{ yellow: data.is_collected }"
          :icon="data.is_collected ? 'star' : 'star-o'"
          @click="onStar"
        ></van-tabbar-item>
        <van-tabbar-item
          :class="{ yellow: data.recomments }"
          :icon="data.recomments && commentLength ? 'good-job' : 'good-job-o'"
          @click="onGoodJob"
        ></van-tabbar-item>
        <van-tabbar-item icon="share-o"></van-tabbar-item>
      </van-tabbar>
    </div>

    <!-- 发布评论 -->
    <van-popup v-model="commentPlain" position="bottom">
      <post-comment :target="id" :articleId='id' @update-comment="updateComment"></post-comment>
    </van-popup>

    <!-- 评论回复 -->
    <van-popup
      v-model="replyCommentPlain"
      position="bottom"
      class="reply-container"
    >
      <comment-reply
        :item="item"
        :id='id'
        v-if="replyCommentPlain"
        @replay-click="onReplyClick"
        @close-reply="replyCommentPlain = false"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { ImagePreview } from 'vant'
// 获取文章ID 1.this.$route.params  2.props （推荐) => 在路由里设置prop:true 即可拿到 （动态路由参数映射到组件的props中）
// import { getArticleDetail, followUser, cancelFollowUser } from '@/api/user'
import { getArticleDetail } from '@/api/user'
import CommentList from './components/commentList'
import PostComment from './components/postComment'
import CommentReply from './components/commentReply'
export default {
  name: '',
  data () {
    return {
      isLoading: false,
      collectLoading: false,
      commentPlain: false, // 发布评论
      replyCommentPlain: false, // 回复评论
      data: {},
      totalCount: 0,
      item: {}// 点击回复时候的信息
    }
  },
  props: {
    id: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onGetArticleDetail () {
      const { data } = await getArticleDetail(this.id)
      this.data = data
      console.log(this.data)
      // 获取文章DOM
      // 取所有image标签 循环注册点击事件
      this.$nextTick(() => { // 获取渲染后的节点
        const contentDom = this.$refs.articleContent
        const imgArr = contentDom.querySelectorAll('img')
        // console.log(imgArr) // 不用$nextTick 那么就是[]
        const imgPathArr = []
        imgArr.forEach((element, index) => {
          imgPathArr.push(element.src)
          element.addEventListener('click', () => {
            this.handleImagePreview(imgPathArr, index)
          })
        })
      })
      // 事件中 ImagePreview
    },
    handleImagePreview (imgPathArr, index) {
      ImagePreview({
        images: imgPathArr,
        loop: false,
        startPosition: index, // 图片预览起始位置索引
        closeable: true
      })
    },
    async onFollow () {
      /* if (this.data.is_followed) {
        const { data } = await followUser({ target: this.user.aut_id })
        console.log(data)
      } else {
        const { data } = await cancelFollowUser(this.data.aut_id)
        console.log(data)
      } */
      this.isLoading = true
      setTimeout(() => {
        this.data.is_followed = !this.data.is_followed
        this.isLoading = false
      }, 3000)
    },
    writeComment () {
    },
    onStar () {
      if (this.collectLoading) { return }
      this.collectLoading = true
      setTimeout(() => {
        this.$toast({
          message: '收藏成功',
          type: 'success'
        })
        this.data.is_collected = !this.data.is_collected
        this.collectLoading = false
      }, 3000)
    },
    onGoodJob () { },
    updateComment (val) {
      this.totalCount++
      this.$refs.commentListCom.commentList.unshift({ content: val })
      this.commentPlain = false
      // this.CommentList
    },
    onReplyClick (item) {
      this.item = item
      this.replyCommentPlain = true
    }
  },
  computed: {
    commentLength () {
      return this.data.recomments?.length ?? 0
    }
  },
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  created () {
    // this.abc = this.data?.abc?.abc?.ab?.c || 333
    this.onGetArticleDetail()
    // this.abc = this.data?.abc?.abc?.ab?.c ?? 333
  },
  mounted () {
  }
}
</script>

<style scoped lang='less'>
.article-detail-container {
  .view {
    position: fixed;
    top: 45px;
    width: 100%;
    overflow-y: auto;
    bottom: 50px;
    left: 0;
    background: #fff;
  }
  .nav-bar {
    background: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background: #fff;
    margin: 0;
  }
  .author-wrap {
    .avatar {
      margin-right: 10px;
      height: 35px;
      width: 35px;
    }
    .name {
      font-size: 12px;
    }
    .van-button {
      padding: 0 15px;
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 14px;
    background: #fff;
  }
  .footer {
    .yellow {
      color: #5babfb;
    }
    .comment-btn {
      display: flex;
      align-items: center;
      padding: 0 25px;
      flex: 4;
    }
    /deep/ .van-tabbar-item__icon {
      margin: 0;
    }
  }
  .reply-container {
    min-height: 80%;
    padding-bottom: 40px;
  }
}
</style>
