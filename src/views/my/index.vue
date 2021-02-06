<template>
  <div class='my-container'>
    <!-- 顶部个人信息 -->
    <van-cell-group class='my-info' v-if='user'>
      <van-cell title='' value='' :border='false' center class="base-info">
        <van-image
          class='avatar'
          slot='icon'
          fit='cover'
          round
          :src="currentUser.photo" />
        <div slot='title' class='name'>{{currentUser.name}}</div>
        <van-button size='small' round class='update-btn' to='/user'>编辑资料</van-button>
      </van-cell>
      <van-grid
        :column-num="4"
        class='data-info'
        :border='false'>
        <van-grid-item class='data-info-item'>
          <div slot="text" class='text-wrap'>
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class='data-info-item'>
          <div slot="text" class='text-wrap'>
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class='data-info-item'>
          <div slot="text" class='text-wrap'>
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class='data-info-item'>
          <div slot="text" class='text-wrap'>
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else @click='$router.push("/login")'>
      <div class="not-login-img-wrapper">
        <img src="./del.png" class="" alt="">
      </div>
      <span class='not-login-text' >登录 / 注册</span>
    </div>
    <!-- 顶部个人信息 -->
    <van-grid :column-num="2" class='class="mb-4"'>
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
    </van-grid>
      <!-- is-link右侧箭头 -->
    <van-cell title='消息通知' is-link url='baidu.com'/>
    <van-cell  class="mb-4" title='小爱同学' to='/chat'/>
    <van-cell
      v-if='user'
      title='退出登录'
      class='logout-btn'
      @click='onLogout'
      />
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {
        name: 'key3',
        photo: 'https://img.yzcdn.cn/vant/cat.jpeg'
      }
    }
  },
  props: {

  },
  methods: {
    onLogout () {
      // 提示退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗'
      }).then(() => {
        // 在setUser中 将state的user设置到localstorage 所以这里只用commit就可以
        // user变化 视图变化 响应式
        this.$store.commit('setUser', null)
      })
    },
    async onGetUserInfo () {
      const { data } = await getUserInfo()
      console.log(data)
      // this.currentUser = data.data
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {

  },
  created () {
    this.onGetUserInfo()
  }
}
</script>

<style lang='less' scoped>
.my-container{
  .my-info{
    background: url('./bg.jpg') no-repeat;
    background-size: cover;
    .base-info{
      background: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top:38px;
      padding-bottom:11px;
      .avatar{
        height: 66px;
        width:  66px;
        border:1px solid #fff;
        margin-right: 11px;
      }
      .name{
        color:#fff;
        font-size: 15px;
      }
      .update-btn{
        height: 16px;
        font-size: 10px;
        color:#666;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color:#fff;
        .text-wrap{
          display: flex;
          flex-direction: column;
          align-items: center;
          .count{
            font-size:16px;
          }
          .text{
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content{
      background: unset;
    }
  }
  .logout-btn {
    text-align: center;
    color:#d86262;
  }
  .not-login{
    background: url('./bg.jpg') no-repeat;
    background-size: cover;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .not-login-img-wrapper{
      width: 66px;
      height: 66px;
      background: #fff;
      border-radius:50% ;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
      }
    }
    .not-login-text{
      font-size: 14px;
      color:#fff;
    }
  }
  .mb-4{
    margin-bottom:4px;
  }
}
</style>
