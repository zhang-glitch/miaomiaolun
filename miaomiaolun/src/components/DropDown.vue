<template>
  <div class="dropdown" ref="refDom">
    <a class="btn btn-outline-light dropdown-toggle" href="javascript:;" @click="openMenu">
    hi, {{name}}
    </a>
  <!-- bootstrap中默认dropdown为display: none -->
    <div class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen" >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue";
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'DropDown',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false);
    const openMenu = () => {
      isOpen.value = !isOpen.value;
    }

    const refDom = ref<null | HTMLElement>(null)
    const {isClickOutside} = useClickOutside(refDom)

    watch(isClickOutside, () => {
      // 当点击是下拉菜单的外部并且下拉菜单处于展开状态。
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      openMenu,
      refDom
    }
  }
})
</script>

<style>

</style>