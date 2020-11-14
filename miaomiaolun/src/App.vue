<template>
  <div class="app">
    <Header :user="user"></Header>
    <validate-form @form-submit="onFormSubmit">
      <div class="form-group">
        <label for="Email">邮箱地址</label>
        <validate-input 
          v-model="value" 
          :rules="rules" 
          placeholder="请输入邮箱地址" 
          type="email" 
          ref="inputRef"
          ></validate-input>
      </div>
    </validate-form>
    <p>{{value}}</p>
    <column-list :list="list"></column-list>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import ColumnList, {ColumnProps} from './components/ColumnList.vue'
import Header from './components/Header.vue'
import ValidateInput, {RulesProps} from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
import Footer from './components/Footer.vue'

const rules: RulesProps = [
  {
    type: 'required',
    message: '请输入内容'
  },
  {
    type: 'email',
    message: '请输入正确的邮箱地址'
  }
]
const list: ColumnProps[] = [
  {
    id: 1,
    title: 'iiiiiiiiiiiii',
    avatar: '',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 2,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 3,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 4,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 5,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 6,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
] 

const user = {
  id: 0,
  name: 'zhanghao',
  isLogin: true
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    Header,
    ValidateInput,
    ValidateForm,
    Footer
  },
  setup() {
    const value = ref("")
    const inputRef = ref<any>(null)
    const onFormSubmit = (val: boolean) => {
      console.log(inputRef.value.validate())
    }
    return {
      list,
      user,
      rules,
      value,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>
</style>
