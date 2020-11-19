<template>
  <div class="login-page mx-auto p-3 w-330">
    <div class="container">
      <h5 class="my-4 text-center">登录到淼淼论</h5>
      <validate-form @form-submit="onFormSubmit" :style="{'width': '300px', 'marginLeft': '520px'}">
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            type="text"
            placeholder="请输入邮箱地址"
            v-model="emailPassword.email"
            :rules="emailRules"
          ></validate-input>
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            type="password"
            placeholder="请输入密码"
            v-model="emailPassword.password"
            :rules="passwordRules"
          ></validate-input>
        </div>
        <a href="/register" class="skip-register">还没有账户？去注册一个新的吧！</a>
        <template #submit>
          <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
        </template>
        
      </validate-form>
      <Loader v-if="isLoading"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, {RulesProps} from '../components/ValidateInput.vue'
import {useStore} from 'vuex'
import Loader from '../components/Loader.vue'
import { StateProps } from '../store';
import CreateMessage from '../components/CreateMessage'

const emailRules: RulesProps = [
  {
    type: 'required',
    message: '请填写邮箱地址'
  },
  {
    type: 'email',
    message: '请填写正确的邮箱地址'
  }
]
const passwordRules: RulesProps = [
  {
    type: 'required',
    message: '请填写密码'
  },
  {
    type: 'password',
    message: '请填写正确的密码,包括大小写字母且长度在8~16位'
  }
]

export default defineComponent({
  name: 'login',
  components: {
    ValidateForm,
    ValidateInput,
    Loader,
  },
  setup() {
    // const emailValue = ref("")
    // const passwordValue = ref("")

    let emailPassword = reactive({
      email: '',
      password: ''
    })
    const router = useRouter()
    const store = useStore<StateProps>()
    const onFormSubmit = (val: boolean) => {
      if(val) {
        store.dispatch('getLogin', emailPassword)
        if(store.state.token) {
          // 请求成功的时候设置alert样式
          CreateMessage("请求成功，即将跳转到首页", 'success')
          setTimeout(() => {
            // 获取用户信息
            store.dispatch('getUser')
            router.push('/index')
          }, 2000)
        }else {
          const err = computed(() => store.state.error)
          watch(() => err.value.isError, () => {
            const {isError, message} = err.value
            // console.log(err)
            if(isError && message) {
              // console.log(err.value.message)
              CreateMessage(message, 'danger')
            }
          })
        }
      }
    }

    
    const isLoading = computed(() => store.state.loading)
    return {
      // emailValue,
      // passwordValue,
      onFormSubmit,
      emailRules,
      passwordRules,
      emailPassword,
      isLoading,
    }
  }
})
</script>

<style scoped>
  .skip-register {
    display: inline-block;
    margin-bottom: 20px;
    text-decoration: none;
  }
</style>