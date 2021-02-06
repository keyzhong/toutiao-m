<template>
  <div class="avatar-container">
    <div>
      <img ref='imageDom' class='img' :src="image"/>
    </div>
    <van-nav-bar
      class="avatar-footer"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script type="text/ecmascript-6">
// import { updateUserAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: '',
  data () {
    return {
      image: window.URL.createObjectURL(this.imgFile),
      cropper: null
    }
  },
  props: {
    imgFile: {
      type: File,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '上传中',
        forbidClick: true,
        duration: 0 // 0表示持续展示
      })
      // 拿到裁切后的文件的blob数据
      const file = await this.getCroppedCanvas()
      console.log(file)
      // 若Content-type是mulitpart/form-data 那么要提交FormData对象
      const fd = new FormData()
      fd.append('avatar', file)
      /* const { data } = await updateUserAvatar({

      }) */
      this.$toast.success('上传成功')
      this.$emit('close')
      this.$emit('update-avatar', window.URL.createObjectURL(file))
    },
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(file => {
          resolve(file)
        })
      })
    }
  },
  computed: {

  },
  components: {

  },
  created () {
  },
  mounted () {
    const image = this.$refs.imageDom
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style scoped lang='less'>
.avatar-container {
  .img {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
  .avatar-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
