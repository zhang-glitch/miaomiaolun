<template>
  <div>
    <a class="dropdown-item" :href="path">
      <slot></slot>
    </a>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'DropDownItem',
  props: {
    path: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
</style>