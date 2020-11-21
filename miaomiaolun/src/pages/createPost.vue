<template>
  <div class="create-post">
    <div class="container">
      <div class="row">
        <h2 class="title">新建文章</h2>
      <div class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4" :style="{'background': '#eee'}">
          <up-loader 
            @on-success="onSuccess" 
            @on-error="onError" 
            action="/upload"
            :uploadCheck="uploadCheck"
            ></up-loader>
        </div>
      </div>
      <validate-form @form-submit="onFormSubmit">
        <validate-input
          placeholder="请输入文章标题"
          type="text"
          :rules="titleRules"
          v-model="titleVal"
        />
        <validate-input
          placehodler="请输入文章内容"
          type="textarea"
          :rules="contentRules"
          v-model="contentVal"
          :tag="'textarea'"
          rows="10"
        />
        <template #submit>
          <button type="submit" class="btn btn-primary">发表文章</button>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, {RulesProps} from '../components/ValidateInput.vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { StateProps, PostProps, AvatarProps } from '../store';
import UpLoader from '../components/UpLoader.vue'
import axios from 'axios';
import CreateMessge from '../components/CreateMessage'
import {beforeUploadCheck} from '../fun'

const titleRules: RulesProps = [
  {
    type: 'required',
    message: '文章标题不能为空'
  }
]
const contentRules: RulesProps = [
  {
    type: 'required',
    message: '文章内容不能为空'
  }
]

export default defineComponent({
  name: 'createPost',
  components: {
    ValidateForm,
    ValidateInput,
    UpLoader
  },
  setup() {
    const titleVal = ref("")
    const contentVal = ref("")
    const router = useRouter()
    const store = useStore<StateProps>()
    const imgId = ref("")
    const isPassed = ref(false)
    
    // 这样将: ComputedRef<number>转化成number类型呢？ 
    // 答: 想要获取到值，我们不需要转换，直接用他的value属性即可
    // const columnId = computed(() => {
    //   return store.state.user.columnId
    // })

    const onFormSubmit = (val: boolean) => {
      if(val && isPassed) {
        // 将数据存储在postlist中
        const user = computed(() => store.state.user)
        const {column, _id} = user.value
        if(column) {

          // store.commit("addPost", postval)
          axios.post("/posts", {
            column,
            title: titleVal.value,
            content: contentVal.value,
            image: imgId.value,
            author: _id
          }).then(res => {
            console.log(res)
            CreateMessge("文章创建成功, 即将跳转到个人专栏", "success")
            setTimeout(() => {
              router.push(`/column/${column}`)
            }, 2000)
          }).catch(() => {
            CreateMessge("文章创建失败", "danger")
          })
        }
      }
    }

    const onSuccess = (imgObj: AvatarProps) => {
      // 获取上传图片的id
      if(imgObj._id) {
        imgId.value = imgObj._id
      }

      CreateMessge('图片上传成功', "success")
    }
    const onError = () => {
      CreateMessge("图片上传失败", "danger")
    }

    const uploadCheck = (file: File) => {
      // 验证改文件是否是jpg或者png
        const result = beforeUploadCheck(file, {format: ['image/jpeg', 'image/png'], size: 1})
        const {passed, error} = result
        
        isPassed.value = passed
        if(error === "format") {
          CreateMessge("头像上传失败，只能上传jpg/png", "danger")
        }
        if(error === "size") {
          CreateMessge('上传图片大小不能超过 1Mb', "danger")
        }
      return passed
    }
   
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
      onSuccess,
      onError,
      uploadCheck
    }
  }
})
</script>

<style>

</style>