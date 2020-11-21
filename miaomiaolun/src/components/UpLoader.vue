<template>
  <div class="up-loader">
    <div class="btn-upload" @click="triggerUpload">
      <span v-if="status === 'ready'">点击上传头像</span>
      <div v-else-if="status === 'loading'">
        <span>正在上传</span>
        <span class="spinner-border text-secondary">
          <span class="sr-only"></span>
        </span>
      </div>
      <span v-else-if="status === 'error'">头像上传失败</span>
      <div class="img" v-else>
        <img :src="imgUrl" class="img-fluid" alt="">
      </div>
    </div>
      <input type="file" ref="inputRef" class="d-none" @change="handleFileChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import axios from 'axios'

type StatusProps = 'ready' | 'loading' | 'success' | 'error'
export type UploadCheckFunc = (file: File) => boolean
export default defineComponent({
  name: 'UpLoader',
  emits: ['on-success', 'on-error'],
  props: {
    action: {
      type: String,
      required: true
    },
    uploadCheck: {
      type: Function as PropType<UploadCheckFunc>,
      required: true
    }
  },
  setup(props, context) {

    const inputRef = ref<null | HTMLElement>(null)
    const status = ref<StatusProps>('ready')
    const imgUrl = ref('')
    const triggerUpload = () => {
      if(inputRef.value) {
        inputRef.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if(target.files) {
        const files = Array.from(target.files)
        // 设置状态为正在上传
        status.value = 'loading'
        const upLoaderFile = files[0]

        // 验证上传的图片,如果验证不通过则不发送请求
       if(props.uploadCheck) {
          const fileCheck = props.uploadCheck(upLoaderFile)
          if(!fileCheck) {
            return 
          }
       }

        const formData = new FormData()
        formData.append(upLoaderFile.name, upLoaderFile)
        axios.post(props.action, formData).then(res => {
          // console.log(res)
          // 设置状态为上传成功
          status.value = 'success'
          // 为了做到组件化，当成功时，发送事件
          context.emit('on-success', res.data)
          // console.log(res)
          imgUrl.value = res.data.url
          
        }).catch(() => {
          status.value = "error"
          context.emit('on-error')
        })
      }
    }

    
    return {
      handleFileChange,
      inputRef,
      triggerUpload,
      status,
      imgUrl
    }
  }
})
</script>

<style scoped>
  .btn-upload {
    font-size: 36px;
    color: #6c757d;
    padding: 60px 0;
    cursor: pointer;
  }

  .text-secondary {
    vertical-align: middle;
    font-size: 16px !important;
    margin-left: 10px;
  }


  .img img {
    width: 100%;
    height: 400px;
  }
</style>