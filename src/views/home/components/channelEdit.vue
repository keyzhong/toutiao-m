<template>
  <div class="edit-container">
    <van-cell center :border="false">
      <div slot="title">我的频道</div>
      <van-button type="danger" @click="editChannel" round plain size="mini">{{
        isEdit ? '完成' : '编辑'
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="channel-wrap">
      <van-grid-item
        :icon="isEdit && index > 0 ? 'close' : ''"
        class="channel-item"
        :class="{ active: index === activeIndex }"
        v-for="(value, index) in myChannelList"
        :key="value.id"
        :text="value.name"
        @click="handleClick(value,index)"
      >
      </van-grid-item>
    </van-grid>

    <van-cell center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10" class="channel-wrap">
      <van-grid-item
        class="channel-item"
        v-for="value in allChannelsList"
        :key="value.id"
        :text="value.name"
        @click="addChannel(value)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAllChannels, changeUserChannels, deleteUserChannels } from '@/api/user.js'
import { setItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      allChannelsList: [],
      isEdit: false
    }
  },
  props: {
    myChannelList: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onGetAllChannels () {
      const { data } = await getAllChannels()
      this.allChannelsList = data.channels
      // 所有channel 减去 我的channel 等于 推荐
    },
    async addChannel (val) {
      this.myChannelList.push(val)
      // 数据需要持久化
      if (this.user) {
        await changeUserChannels({
          channels: [
            {
              id: val.id,
              seq: this.myChannelList.length
            }
          ]
        })
      } else {
        setItem('myChannels', this.myChannelList)
      }
    },
    editChannel () {
      this.isEdit = !this.isEdit
    },
    handleClick (channel, index) {
      if (this.isEdit) { // 编辑状态 删除频道
        if (index !== 0) {
          this.deleteChannel(channel, index)
        }
      } else { // 非编辑 跳转到指定频道
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      // 删除激活频道前面的频道 active会变
      if (this.activeIndex >= index) {
        // 更新激活频道的索引
        this.$emit('switchChannel', this.activeIndex - 1)
      }

      // 这里修改数组 会影响父组件的数据
      if (this.user) {
        await deleteUserChannels(channel.id)
        this.myChannelList.splice(index, 1)
      } else {
        this.myChannelList.splice(index, 1)
        setItem('myChannels', this.myChannelList)
      }
    },
    switchChannel (index) {
      this.$emit('switchChannel', index)
      this.$emit('close')
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性观测内部数据变化而变化
    recommendChannels () {
      return this.allChannelsList.filter(channel => {
        return !this.myChannelList.find(val => {
          return val.id === channel.id
        })
      })
    }
  },
  components: {

  },
  mounted () {
  },
  created () {
    this.onGetAllChannels()
  }
}
</script>

<style scoped lang='less'>
.edit-container {
  padding-top: 44px;
  padding-bottom: 10px;
  .van-button__text {
    padding: 0 10px;
  }
  .channel-wrap {
    padding-bottom: 50px;
    .channel-item {
      position: relative;
      width: 80px;
      height: 43px;
      font-size: 14px;
      color: #222;
      /deep/ .van-grid-item__content {
        background: #f4f5f6;
        .van-grid-item__text {
          margin: 0;
        }
      }
      /deep/ .van-icon {
        position: absolute;
        top: -8px;
        right: -4px;
        font-size: 18px;
        color: #ccc;
      }
      &.active {
        /deep/ .van-grid-item__text {
          color: #3296fa;
        }
      }
    }
  }
}
</style>
