<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="input-container">
      <van-form @submit='loginFn'
        ref = 'loginForm'
        @failed='failedFn'
        validate-first
        :show-error='false'
        :show-error-message='false'>
        <van-field
          v-model="user.mobile"
          label=""
          clearable
          left-icon="phone"
          placeholder="请输入手机号"
          name='mobile'
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          center
          clearable
          left-icon="lock"
          placeholder="请输入短信验证码"
          :rules="formRules.code"
          name='code'
        >
          <!-- 这里给发送验证码的按钮加上prevent修饰符 否则按钮点击会触发form的submit事件 -->
          <template #button>
            <van-count-down
              :time="time"
              format="ss 秒"
              v-if = 'isShowCount'
              @finish='isShowCount = false'/>
            <van-button
            v-else
            :loading='isSendCodeLoading'
            size="small"
            type="default"
            round
            @click.prevent="sendCode"
            >获取验证码</van-button
            >
          </template>
        </van-field>
        <div class="login-btn-wrapper">
        <van-button type="info" block class="login-btn" >登录</van-button>
      </div>
      </van-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { login } from '@/api/user.js'
// import { Toast } from 'vant'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      time: 1000 * 5,
      isShowCount: false,
      isSendCodeLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ]
      }
    }
  },
  props: {

  },
  methods: {
    async loginFn () {
      this.$toast.loading({ // 这样写不用单独引入toast 即不用import
        message: '登录中',
        duration: 0, // 时间配置 设置为0不消失
        forbidClick: true
      })
      /*  Toast.loading({
        message: '登录中',
        duration: 0, // 时间配置 设置为0不消失
        forbidClick: true
      }) */
      try {
        const res = await login(this.user) // 要写在try 中
        console.log(res)
        // Toast.success('登录成功')
        this.$toast.success('登录成功')
        this.$router.push('/')
        this.$store.commit('setUser', { name: 'key', age: 20 }) // 将用户信息存到vuex中
      } catch (err) {
        this.$toast.success('登录失败')
        this.$router.push('/')
        this.$store.commit('setUser', { name: 'key', age: 20 }) // 将用户信息存到vuex中
        // Toast.fail('登录失败')
      }
    },
    failedFn (err) {
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    async sendCode () {
      // 检验手机号 validate('自定义的name')
      try {
        await this.$refs.loginForm.validate('mobile')
        // 校验通过后发送验证码 显示倒计时
        // 发送验证码
        // const res = await {} // 请求回来的数据
        this.isSendCodeLoading = true
        this.isShowCount = true
      } catch (err) {
        let message = ''
        // try 里面任何代码的错误都进入catch ( 校验失败的 以及 发送验证码失败的 )
        // 不同的错误要不同的提示 需要判断 各个状态码的
        if (err && err.response) { // && res.response.status === 429  // 请求失败
          message = '发送太频繁了'
        } else if (err.name === 'mobile') { // 校验失败
          message = err.message
        } else {
          message = '请输入正确的手机号'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // this.isSendCodeLoading = false
    }
  },
  computed: {

  },
  components: {

  }
}
</script>

<style scoped lang='less'>
.login-btn-wrapper {
  padding: 26px 16px;
  .login-btn {
    background: #6db4fb;
    border: none;
    .van-button__text {
      font-size: 15px;
    }
  }
}
</style>
