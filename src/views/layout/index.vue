<template>
  <div class='layout-container'>
    <!-- <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    /> -->
    <!-- 子路由出口 -->
      <keep-alive>
      <router-view />
    </keep-alive>
  <!-- /子路由出口 -->

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  props: {

  },
  methods: {
    onClickLeft () {},
    onClickRight () {}
  },
  computed: {

  },
  components: {

  }
}
</script>

<style scoped lang='less'>
</style>
