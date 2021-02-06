<template>
  <div class="chat-container">
    <van-nav-bar
      title="小爱同学"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="chat-group" ref="chatGroup">
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
      <van-cell class="chat-item" title="单元格" value="内容" />
    </van-cell-group>

    <van-tabbar class="chat-footer">
      <van-field v-model="msg" center clearable label="" placeholder="请输入">
        <template #button>
          <van-button size="small" type="primary" @click="onSend"
            >发送</van-button
          >
        </template>
      </van-field>
    </van-tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
// import io from 'socket.io-client'
// socket.emit('type', 'data')
// socket.on('type', 'data')
import { getItem, setItem } from '@/utils/storage'
export default {
  name: '',
  data () {
    return {
      msg: '',
      msgList: getItem('chat-msg') || [],
      socket: null
    }
  },
  props: {

  },
  watch: {
    msgList () {
      setItem('chat-msg', this.msgList)
    }
  },
  methods: {
    onSend () {
      const data = {
        msg: this.msg,
        timestamp: Date.now()
      }
      console.log(data)
      // this.socket.emit('message', data)
      // this.magList.push(data)
      this.msg = ''
      // 数据改变视图更新不是立即进行的 那么$nextTick
      // 操作数据改变之后更新后的视图
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    // 滚动到底部
    scrollToBottom () {
      const chatGroup = this.$refs.chatGroup
      chatGroup.scrollTop = chatGroup.scrollHeight
    }
  },
  computed: {

  },
  components: {

  },
  created () {
    /*  this.socket = io('http://ttapi.research.itcast.cn/')
      this.socket.on('connect', function () {
        console.log('连接成功')
      })
      this.socket.on('event', function () { })
      this.socket.on('disconnect', function () { }) */

    /* this.socket.on('message', data => { // 这里的message是后端定义 就是上面event同样的道理
      this.magList.push(data)
    }) */
  },
  mounted () {
    this.scrollToBottom()
  }
}
</script>

<style scoped lang='less'>
.chat-container {
  .chat-group {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 50px;
    overflow-y: scroll;
  }
  .chat-footer {
    border-bottom: none;
    align-items: center;
    .van-button {
      padding: 0 20px;
    }
  }
}
</style>
