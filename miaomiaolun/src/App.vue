<template>
  <div class="app">
    <router-view></router-view>
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
