<template>
  <div class="user-container">
    <van-nav-bar
      class="user-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="user-info-wrap">
      <van-cell
        title="头像"
        class="avatar"
        size="large"
        value="avatar"
        center
        is-link
        @click="$refs.file.click()"
      >
        <input type="file" hidden ref="file" @change="onFileChange" />
        <van-image
          fit="cover"
          :src="user.avatar"
          round
          width="30"
          height="30"
        ></van-image>
      </van-cell>
      <van-cell
        title="昵称"
        size="large"
        :value="user.nickName"
        center
        is-link
        @click="editNickname = true"
      />
      <van-cell
        title="性别"
        size="large"
        :value="user.gender === 0 ? '男' : '女'"
        center
        is-link
        @click="editGender = true"
      />
      <van-cell
        title="生日"
        size="large"
        :value="user.bitrhday"
        center
        is-link
        @click="editBirthday = true"
      />
    </van-cell-group>
    <!-- 修改名称 -->
    <van-popup v-model="editNickname" class="edit-nickname" position="bottom">
      <!--    当传递给子组件的一个数据既要使用又要修改 例如这name
        可以用v-model => :value='user.nickname' + $input='user.nickname=$event'
        当数据为多个时 那么可以用.sync修饰符 因为不限制个数
        :gender.synv = user.gender === :gender=user.gender + @update:gender=user.gender=$event
  -->
      <!-- <update-name
        :name='user.nickName'
        @close='editNickname = false'
        @update-name='user.nickName = $event'
      ></update-name> -->
      <update-name
        v-if="editNickname"
        v-model="user.nickName"
        @close="editNickname = false"
      ></update-name>
    </van-popup>
    <!-- 修改性别 -->
    <van-popup v-model="editGender" class="edit-gender" position="bottom">
      <update-gender
        v-model="user.gender"
        @close="editGender = false"
      ></update-gender>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="editBirthday" class="edit-birthday" position="bottom">
      <update-birthday
        v-model="user.bitrhday"
        v-if="editBirthday"
        @close="editBirthday = false"
      >
      </update-birthday>
    </van-popup>
    <!-- 修改头像 -->
    <van-popup an-popup v-model="editAvatar" class="edit-avatar">
      <update-avatar
      v-if='editAvatar'
      :imgFile='imgFile'
      @close='editAvatar = false'
      @update-avatar = 'user.avatar = $event'
      >
      </update-avatar>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { getUserInfo } from '@/api/user'
import UpdateName from './components/updateName'
import UpdateGender from './components/updateGender'
import UpdateBirthday from './components/updateBirthday'
import UpdateAvatar from './components/updateAvatar'
export default {
  name: '',
  data () {
    return {
      chooseBirthday: false,
      editAvatar: false,
      editNickname: false,
      editGender: false,
      editBirthday: false,
      user: {
        avatar: 'https://i2.tiimg.com/10086/49d78ecb45140c2c.png',
        nickName: 'key3',
        gender: 0, // 0男 1女
        bitrhday: '2010-05-11'
      },
      imgFile: null
    }
  },
  props: {

  },
  methods: {
    async onGetUserInfo () {
      const { data } = await getUserInfo()
      console.log(data)
      // this.currentUser = data.data
    },
    onFileChange () {
      console.log('open')
      // 弹出层
      this.editAvatar = true
      // 将图片传给子组件显示
      this.imgFile = this.$refs.file.files[0]
      // 裁切
      // 解决上传相同不触发的问题
    }
  },
  computed: {

  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
  },
  created () {
    // this.onGetUserInfo()
  }
}
</script>

<style scoped lang='less'>
.user-container {
  .van-popup {
    background: #f5f7f9;
  }
  .user-bar {
    background: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  .user-info-wrap {
    .avatar {
      .van-cell__value {
        display: flex;
        flex: unset;
      }
    }
  }
  .edit-nickname {
    height: 100%;
  }
  .edit-avatar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 46px;
    box-sizing: border-box;
    background: #000;
    /deep/ .van-nav-bar{
      background: rgba(0,0,0,.5);
      .van-nav-bar__text{
        color:#eee;
      }
    }
  }

}
</style>
