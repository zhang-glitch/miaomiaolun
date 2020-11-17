<template>
  <div class="create-post">
    <div class="container">
      <div class="row">
        <div class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4" :style="{'background': '#eee'}">上传头像</div>
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
import { StateProps, PostProps } from '../store';

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
    ValidateInput
  },
  setup() {
    const titleVal = ref("")
    const contentVal = ref("")
    const router = useRouter()
    const store = useStore<StateProps>()
    
    // 这样将: ComputedRef<number>转化成number类型呢？ 
    // 答: 想要获取到值，我们不需要转换，直接用他的value属性即可
    // const columnId = computed(() => {
    //   return store.state.user.columnId
    // })

    const onFormSubmit = (val: boolean) => {
      if(val) {
        // 将数据存储在postlist中
        const column = store.state.user.columnId
        if(column) {
           const postval: PostProps = {
            _id: "1",
            column,
            title: titleVal.value,
            excerpt: contentVal.value,
            createdAt: new Date().toLocaleString()
          }

          store.commit("addPost", postval)
          router.push(`/column/${column}`)
        }
      }
    }
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit
    }
  }
})
</script>

<style>

</style>