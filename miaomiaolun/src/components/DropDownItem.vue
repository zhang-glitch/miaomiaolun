<template>
  <div>
    <a class="dropdown-item" href="javascript:;">
      <slot></slot>
    </a>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'DropDownItem',

})
</script>

<style scoped>
</style>