<template>
  <div class="create-post">
    <div class="container">
      <div class="row">
        <h2 class="title">{{isCreate ? "新建文章" : "修改文章"}}</h2>
      <div class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4" :style="{'background': '#eee'}">
          <up-loader 
            @on-success="onSuccess" 
            @on-error="onError" 
            action="/upload"
            :uploadCheck="uploadCheck"
            :editImg="editImg"
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
          type="textarea"
          :rules="contentRules"
          v-model="contentVal"
          :tag="'textarea'"
          rows="10"
        />
        <template #submit>
          <button type="submit" class="btn btn-primary">{{isCreate ? "发表文章" : "更新文章"}}</button>
        </template>
      </validate-form>
    </div>
    
    <Loader v-if="isLoading"></Loader>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, {RulesProps} from '../components/ValidateInput.vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import { StateProps, PostProps, AvatarProps } from '../store';
import UpLoader from '../components/UpLoader.vue'
import axios from 'axios';
import CreateMessge from '../components/CreateMessage'
import {beforeUploadCheck} from '../fun'
import Loader from '../components/Loader.vue'

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
    UpLoader,
    Loader
  },
  setup() {
    const titleVal = ref("")
    const contentVal = ref("")
    const router = useRouter()
    const route = useRoute()
    const store = useStore<StateProps>()
    const imgId = ref("")
    const isPassed = ref(false)
    const editImg = ref("")

     // 判断是修改文章还是新建文章
    const isCreate = ref(true)
    // 如果有query则表示他是修改文章
    if(route.query.id) {
      isCreate.value = false
      // 发送详情页面的请求，将文章的内容跳入输入框中
      onMounted(() => {
         store.dispatch("getPostDetail",  route.query.id)
        // .then(res => {
        //   console.log(res)
        //   titleVal.value = res.title;
        //   contentVal.value = res.content;
        
        // })

        const postDetailVal = computed(() => store.state.postDetail)
        const {title, content, image} = postDetailVal.value
        if(postDetailVal.value && title && content && image && image.url) {
          titleVal.value = title;
          contentVal.value = content
          editImg.value = image.url
        }
      })
    }
 

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
          if(!route.query.id) {
            axios.post("/posts", {
              column,
              title: titleVal.value,
              content: contentVal.value,
              image: imgId.value,
              author: _id
            }).then(res => {
              // console.log(res)
              CreateMessge("文章创建成功, 即将跳转到个人专栏", "success")
              setTimeout(() => {
                router.push(`/column/${column}`)
              }, 2000)
            }).catch(() => {
              CreateMessge("文章创建失败", "danger")
            })
          }else {
            axios.patch(`/posts/${route.query.id}`, {
              title: titleVal.value,
              content: contentVal.value,
              image: imgId.value
            }).then((res) => {
              // console.log(res)
              CreateMessge("文章修改成功, 即将跳转到个人专栏", "success")
              setTimeout(() => {
                router.push(`/column/${column}`)
              }, 2000)
            }).catch(() => {
              CreateMessge("文章修改失败", "danger")
            })
          }
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

    
    const isLoading = computed(() => store.state.loading)
   
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
      onSuccess,
      onError,
      uploadCheck,
      isCreate,
      editImg,
      isLoading
    }
  }
})
</script>

<style>

</style>