<template>
  <div class="validate-form">
    <form >
      <slot name="default"></slot>
      <div class="submit-area" @click.prevent="FormSubmit">
        <slot name="submit">
          <button type="submit" class="btn btn-primary">登录</button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import emitter from '../mitt'

type Func = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, context) {

    let funcArr: Func[] = []
    const FormSubmit = () => {
      // 调用数组中每一项，然后判断是否有false
      const val = funcArr.map(item => item()).every(element => element)
      context.emit('form-submit', val)
    }

    const callback = (func: boolean) => {
      // 将所有的函数都保存在数组中
      funcArr.push(func)
    }
    emitter.on('all-true', callback)
    onUnmounted(() => {
      emitter.off("all-true", callback)
      // 清空数组
      funcArr = []
    })
    return {
      FormSubmit
    }
  }
})
</script>

<style>

</style>