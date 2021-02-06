<template>
  <div class="gender-container">
    <van-picker
      show-toolbar
      :default-index='defaultIndex'
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  model: {
    prop: 'gender',
    event: 'update-gender'
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.gender
    }
  },
  props: {
    gender: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    /**
     * @params 值
     * @params 索引
     */
    onConfirm (val, index) {
      this.$emit('close')
      this.$emit('update-gender', index)
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

<style scoped>
</style>
