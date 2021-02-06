<template>
  <div class="birthday-container">
    <van-datetime-picker
      v-model="birthday"
      type="date"
      title="选择年月日"
      @confirm='onConfirm'
      @cancel='$emit("close")'
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import dayjs from 'dayjs'
export default {
  name: '',
  data () {
    return {
      minDate: new Date(1970, 0, 1), // 月份会+1 这里实际是6月
      maxDate: new Date(),
      birthday: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  methods: {
    onConfirm (val) {
      /* const bir = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
      const arr = bir.split('-').map(val => {
        if (parseInt(val) < 10) {
          return `0${val}`
        } else {
          return val
        }
      })
      console.log(arr.join('-')) */
      const date = dayjs(this.birthday).format('YYYY-MM-DD')
      this.$emit('close')
      this.$emit('input', date)
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
