<template>
  <div class="replay-comment">
    <van-nav-bar @click-left="onClose">
      <div slot='title'>{{item.reply_count}}条回复</div>
      <van-icon slot="left" name="cross"></van-icon>
    </van-nav-bar>

    <comment-item :item="item" @replay-click="commentPlain = true">
    </comment-item>

    <comment-list
      @replay-click="commentPlain = true"
      :source="item.com_id"
      ref='commentListCom'
      type="c"
    ></comment-list>

    <van-tabbar route center class="footer">
      <van-button block round size="small" @click='commentPlain=true'>评论</van-button>
    </van-tabbar>

    <!-- 发布评论 -->
    <van-popup v-model="commentPlain" position="bottom">
      <post-comment
        @update-comment="onPostSuccsee"
        :articleId="id"
        :target="item.com_id"
      ></post-comment>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import CommentItem from './commentItem'
import CommentList from './commentList'
import PostComment from './postComment'
export default {
  name: '',
  data () {
    return {
      commentPlain: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    id: {
      type: [Object, String, Number],
      required: true
    }
  },
  methods: {
    onClose () {
      this.$emit('close-reply')
    },
    onPostSuccsee (msg) {
      this.$refs.commentListCom.commentList.unshift({ content: msg })
      this.item.reply_count++
      this.commentPlain = false
    }
  },
  computed: {

  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  created () {
    console.log(this.item)
  }
}
</script>

<style scoped lang='less'>
.replay-comment {
  /deep/ .van-nav-bar__content {
    background: #fff;
    .van-icon {
      color: #ccc;
    }
  }
  .footer {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 10px 30px;
  }
}
</style>
