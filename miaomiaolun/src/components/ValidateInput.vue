<template>
  <div class="validate-input pb-3">
     <input 
          v-if="tag === 'input'"
          class="form-control"
          :class="{'is-invalid': inputVal.error}"
          @blur="validate"
          @input="updateValue"
          v-bind="$attrs"
        >
      <textarea
        v-else
        class="form-control" 
        :class="{'is-invalid': inputVal.error}"
        @blur="validate"
        @input="updateValue"
        v-bind="$attrs"
      ></textarea>
        <small id="emailHelp" class="form-text text-muted invalid-feedback" v-if="inputVal.error">{{inputVal.message}}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from "vue";
import emitter from '../mitt'
// 输入框中的约束
interface InputProps {
  email: string,
  error: boolean,
  message: string
}

//验证规则的约束
interface RuleProps {
  type: 'required' | 'email' | 'password',
  message: string
}

export type RulesProps = RuleProps[]
// 判断输入框是普通输入框，还是多行输入框
type Tag = "input" | "textarea"

export default defineComponent({
  name: 'ValidateInput',
  // 将非props中的属性不要挂载到根组件上
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProps>,
    //v-model实现的value
    modelValue: String,
    tag: {
      type: String as PropType<Tag>,
      default: 'input'
    }
  },
  setup(props, context) {
    const inputVal: InputProps = reactive({
      email: props.modelValue || '',
      error: false,
      message: ''
    })

    // 实现双向绑定
    const updateValue = (e: KeyboardEvent) => {
      const changeVal = (e.target as HTMLInputElement).value;
      inputVal.email = changeVal;
      context.emit("update:modelValue", changeVal)
    }

    const validateEmail = () => {
      if(inputVal.email.trim() === "") {
        inputVal.error = true
        inputVal.message = "can not is empty!"
      }
    }

    const validate = () => {
      if(props.rules) {
        const isMessage = props.rules.every(item => {
          inputVal.message = item.message
          let temp = true;
          switch (item.type) {
            // 不为空
            case 'required':
              temp = (inputVal.email.trim() !== "")
              break;
            case 'email':
              // 验证成功
              temp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(inputVal.email)
              break;

            case 'password':
              temp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(inputVal.email)

            default:
              break;
          }
          //手动返回布尔值
          return temp
        })
        inputVal.error = !isMessage
        return isMessage
      }
      return true
    }

    onMounted(() => {
      emitter.emit("all-true", validate)
    })
    return {
      inputVal,
      validateEmail,
      validate,
      updateValue
    }
  }
})
</script>

<style scoped>
  .form-text {
    color: #dc3545 !important;
  }
</style>