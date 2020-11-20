<template>
  <div class="register">
    <div class="container">
      <h5 class="my-4 text-center">注册淼淼论账户</h5>
      <div class="row">
        <validate-form @form-submit="onFormSubmit" class="col-3">
          <div class="mb-3">
            <label class="form-label">邮箱地址</label>
            <validate-input
              type="text"
              placeholder="请输入邮箱地址"
              v-model="inputValue.email"
              :rules="emailRules"
            ></validate-input>
          </div>
          <div class="mb-3">
            <label class="form-label">用户名</label>
            <validate-input
              type="text"
              placeholder="请输入用户名"
              v-model="inputValue.username"
              :rules="usernameRules"
            ></validate-input>
          </div>
          <div class="mb-3">
            <label class="form-label">密码</label>
            <validate-input
              type="password"
              placeholder="请输入密码"
              v-model="inputValue.password"
              :rules="passwordRules"
            ></validate-input>
          </div>
          <div class="mb-3">
            <label class="form-label">重复密码</label>
            <validate-input
              type="password"
              placeholder="请再次输入密码"
              v-model="inputValue.repeatPassword"
              :rules="repeatPasswordRules"
            ></validate-input>
          </div>
          <a href="/login" class="skip-register">已经有账户了？去登录</a>
          <template #submit>
            <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
          </template>
        
        </validate-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from "vue";
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, {RulesProps} from '../components/ValidateInput.vue'
import axios from 'axios'
import CreateMessage from '../components/CreateMessage'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { StateProps } from '../store';

const emailRules: RulesProps = [
  {
    type: 'required',
    message: '邮箱地址不能为空'
  },
  {
    type: 'email',
    message: '请填写正确的邮箱地址'
  }
]
const passwordRules: RulesProps = [
  {
    type: 'required',
    message: '密码不能为空'
  },
  {
    type: 'password',
    message: '请填写正确的密码,包括大小写字母且长度在8~16位'
  }
]

const usernameRules: RulesProps = [
  {
    type: 'required',
    message: '用户名不能为空'
  }
]
export default defineComponent({
  name: 'register',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const inputValue = reactive({
      email: '',
      password: '',
      username: '',
      repeatPassword: ''
    })

    const router = useRouter();
    const store = useStore<StateProps>();
    const repeatPasswordRules: RulesProps = [
      {
        type: 'required',
        message: '密码不能为空'
      },
      //判断两次密码输入的是否一致
      {
        type: 'custom',
        valdator: () => inputValue.repeatPassword === inputValue.password,
        message: '密码不一致'
      }
    ]

    const onFormSubmit = async (val: boolean) => {
      if(val) {
        // 发送请求
        await axios.post('/users', {
            'email': inputValue.email,
            'nickName': inputValue.username,
            'password': inputValue.password
        })
         

        //注册失败
        const err = computed(() => store.state.error)
        const {isError, message} = err.value
        watch(() => isError, () => {
          if(isError && message) {
            CreateMessage(message, "danger")
          }
        })

        
        //注册成功
        CreateMessage('注册成功，即将跳转到登录页面', 'success')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
         
      }
    }
    return {
      inputValue,
      emailRules,
      passwordRules,
      usernameRules,
      repeatPasswordRules,
      onFormSubmit
    } 
  }
})
</script>

<style scoped>
  .skip-register {
    display: inline-block;
    text-decoration: none;
  }
  .row {
    justify-content: center;
  }
</style>