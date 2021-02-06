<template>
  <div id="app">
    <!-- 路由的出口 keep-alive仅对该路由出口渲染的组件有效 这里的仅对一级路由有效 2级路由切换无效-->
     <keep-alive :include="cachePage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['cachePage'])
  }
}
</script>

<style lang="less">
</style>
