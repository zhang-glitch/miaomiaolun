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
            v-model="emailValue"
            :rules="emailRules"
          ></validate-input>
        </div>
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            type="password"
            placeholder="请输入密码"
            v-model="passwordValue"
            :rules="passwordRules"
          ></validate-input>
        </div>
        
        <template #submit>
          <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
        </template>
        
      </validate-form>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, {RulesProps} from '../components/ValidateInput.vue'
import Footer from '../components/Footer.vue'

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
    Footer
  },
  setup() {
    const emailValue = ref("")
    const passwordValue = ref("")
    const router = useRouter()
    const onFormSubmit = (val: boolean) => {
      if(val) {
        router.push('/index')
      }
    }
    return {
      emailValue,
      passwordValue,
      onFormSubmit,
      emailRules,
      passwordRules
    }
  }
})
</script>

<style>

</style>