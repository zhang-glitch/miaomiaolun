<template>
  <div class="edit">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-8">
          <ul class="nav nav-tabs my-4">
            <li class="nav-item">
              <a href="javascript:;" @click="changeItem(1)" class="nav-link" :class="{'active': isPerson}">更新个人资料</a>
            </li>
            <li @click="changeItem(2)">
              <a href="javascript:;" class="nav-link" :class="{'active': !isPerson}">更新专栏信息</a>
            </li>
          </ul>
          <div class="title">
            <h3>编辑个人资料</h3>
          </div>
          <up-loader
            class="file-upload-container d-flex align-items-center justify-content-center bg-light text-secondary circle mx-auto my-3"
            :action="'/upload'"
            :uploadCheck="uploadCheck"
            :editImg="inputVal.editImg"
          ></up-loader>
          <validate-form @form-submit="onFormSubmit">
            <validate-input
              :rules="titleRules"
              v-model="inputVal.nickName"
              placeholder="请输入用户名"
              type="text"
            ></validate-input>
            <validate-input
              :rules="descriptionRules"
              v-model="inputVal.description"
              :tag="'textarea'"
              rows="10"
              placeholder="请输入个人介绍"
            ></validate-input>
            <template #submit>
              <button class="btn btn-primary">提交修改</button>
            </template>
          </validate-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import UpLoader from "../components/UpLoader.vue";
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, {RulesProps} from '../components/ValidateInput.vue'
import {useStore} from 'vuex'
import axios from 'axios'
import { StateProps } from '../store';
import {beforeUploadCheck} from '../fun'
import CreateMessage from '../components/CreateMessage';
import {useRouter} from 'vue-router'

const titleRules: RulesProps = [
  {
    type: 'required',
    message: '文章标题不能为空'
  }
]
const descriptionRules: RulesProps = [
  {
    type: 'required',
    message: '文章内容不能为空'
  }
]


export default defineComponent({
  name: 'edit',
  components: { 
    UpLoader, 
    ValidateForm,
    ValidateInput
  },
  setup() {
    // 判断是更新个人资料 还是更新专栏信息
    const isPerson = ref(true)

    // 判断图片是否符合
    const isPassed = ref(false)
    const store = useStore<StateProps>()
    const router = useRouter()
    let id = ""
    const inputVal = reactive({
      nickName: '',
      description: '',
      editImg: ''
    })

    store.dispatch('getUser').then(res => {
      // console.log("res", res)
      inputVal.nickName = res.nickName
      inputVal.description = res.description
      inputVal.editImg = res.avatar.url

      // 获取用户id
      id = res.column
    })

    // 改变选项卡
    const changeItem = (item: number) => {
      // 1 表示个人信息
      // 2 表示专栏信息
      if(item === 1) {
        isPerson.value = true
        // 填充输入框
        store.dispatch('getUser').then(res => {
        // console.log("res", res)
          inputVal.nickName = res.nickName
          inputVal.description = res.description
          inputVal.editImg = res.avatar.url
        })
      }else if(item === 2) {
        isPerson.value = false
        store.dispatch("getColumn", id).then(
          res => {
            // console.log('wwww', res)
          inputVal.nickName = res.title
          inputVal.description = res.description
          }
        )
        // const columnVal = computed(() => store.state.column)
        // const {title, description, avatar} = columnVal.value
        // if(title && description && avatar && avatar.url) {
        //   inputVal.nickName = title
        //   inputVal.description = description
        //   inputVal.editImg = avatar.url
        // }
      }
    }
    
    const onFormSubmit = (val: boolean) => {
      // 获取用户信息
      const result = computed(() => store.state.user)
      const {column, _id} = result.value
      if(column) {
        if(val && isPassed) {
          if(isPerson.value) {
            axios.patch(`/user/${_id}`, inputVal).then(res => {
              // console.log(res)
              CreateMessage("个人资料修改成功, 即将跳转到首页", "success")
              setTimeout(() => {
                router.push('/')
              }, 2000)
            }).catch(() => {
              CreateMessage("个人资料修改失败", "danger")
            })
          }else {
            console.log("rrqrqeqeq")
            axios.patch(`/columns/${id}`, {
              title: inputVal.nickName,
              description: inputVal.description,
              avatar: {
                _id: id,
                url: inputVal.editImg
              }
            }).then(res => {
              // console.log("dwdad", res)
              CreateMessage("专栏信息修改成功, 即将跳转到首页", "success")
              setTimeout(() => {
                router.push('/')
              }, 2000)
            }).catch(() => {
              CreateMessage("专栏信息修改失败", "danger")
            })
          }
        }
      }
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
      descriptionRules,
      inputVal,
      onFormSubmit,
      isPerson,
      uploadCheck,
      changeItem
    }
  }
})
</script>

<style scoped>


  .nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  .nav-tabs .nav-link {
    color: #495057;
    margin-bottom: -1px;
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  .nav-link {
    display: block;
    padding: .5rem 1rem;
    text-decoration: none;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
  }

  .nav-link.active {
    color: #0d6efd;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }

  ul li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }
</style>