<template>
  <div class="edit-container">
    <van-nav-bar
      class=""
      title="更新昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="pd-10">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  model: {
    prop: 'name',
    event: 'update-name'
  },
  data () {
    return {
      message: this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    onConfirm () {
      this.$toast.loading('正在修改')
      setTimeout(() => {
        this.$toast.success('修改成功')
        this.$emit('close')
        this.$emit('update-name', this.message)
        console.log(this.message)
      }, 2000)
    }
  },
  computed: {
  },
  components: {

  },
  created () {
    console.log('created')
  }
}
</script>

<style scoped lang='less'>
</style>
