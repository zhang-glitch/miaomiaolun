<template>
  <div class="validate-input pb-2">
    <!-- 
          :value="inputVal.val"
          @input="updateValue"
          他两就相当于v-model="inputVal.val"
     -->
     <input 
          v-if="tag === 'input'"
          class="form-control"
          :class="{'is-invalid': inputVal.error}"
          @blur="validate"
          v-bind="$attrs"
          v-model="inputVal.val"
        >
      <textarea
        v-else
        class="form-control" 
        :class="{'is-invalid': inputVal.error}"
        @blur="validate"
        v-bind="$attrs"
        v-model="inputVal.val"
        placeholder="请输入文章内容, 支持markdown语法"
      ></textarea>
        <small id="emailHelp" class="form-text text-muted invalid-feedback" v-if="inputVal.error">{{inputVal.message}}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, ref, watch, computed } from "vue";
import emitter from '../mitt'
// 输入框中的约束
interface InputProps {
  val: string,
  error: boolean,
  message: string
}

//验证规则的约束
interface RuleProps {
  type: 'required' | 'email' | 'password' | 'custom',
  message: string,
  valdator?: () => boolean
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
    // 这里应该是响应式的呀。为什么我们更新文章的时候，填充值，为什么不能被响应呢？还需要watch来监听
    const inputVal: InputProps = reactive({
      val: computed({
        get() {
          return props.modelValue || ''
        },
        set(val: string) {
          context.emit("update:modelValue", val)
        }
      }),
      error: false,
      message: ''
    })

    // // watch监听,改变email的值
    // watch(() => props.modelValue, (newVal) => {
    //   console.log("newVal", newVal)
    //   inputVal.val = newVal || ''
    // })

    // // 实现双向绑定
    // const updateValue = (e: KeyboardEvent) => {
    //   const changeVal = (e.target as HTMLInputElement).value;
    //   inputVal.val = changeVal;
    //   context.emit("update:modelValue", changeVal)
    // }

    const validateEmail = () => {
      if(inputVal.val.trim() === "") {
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
              temp = (inputVal.val.trim() !== "")
              break;
            case 'email':
              // 验证成功
              temp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(inputVal.val)
              break;

            case 'password':
              temp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(inputVal.val)
              break;

            case 'custom': 
              temp = item.valdator ? item.valdator() : true
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
      // updateValue
    }
  }
})
</script>

<style scoped>
  .form-text {
    color: #dc3545 !important;
  }
</style>