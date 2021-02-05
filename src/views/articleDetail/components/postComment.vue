<template>
  <div class="post-comment">
    <van-field
      class="van-col--20"
      v-model="message"
      rows="2"
      autosize
      cols="20"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    >
    </van-field>
    <van-button size="small" @click="pushComment">发布</van-button>
  </div>
</template>

<script type="text/ecmascript-6">
// import { addComments } from '@/api/user'
export default {
  name: '',
  data () {
    return {
      message: ''
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      default: null
    },
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async pushComment () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const params = {
        target: this.target, // 评论文章就是文章ID 回复评论就是评论ID
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null // 文章ID
      }
      setTimeout(() => {
        console.log(params)
        // const { data } = await addComments(params)
        this.$emit('update-comment', this.message)
        this.message = ''
        this.$toast.success('发布成功')
      }, 2000)
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
.post-comment {
  display: flex;
  align-items: center;
  /deep/ .van-cell__value {
    background: #eee;
    padding: 10px;
  }
  .van-button {
    padding: 40px 14px;
    border: none;
  }
}
</style>
