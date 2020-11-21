<template>
  <div class="drop-down-item">
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
  },
  setup(props){
    
    console.log(props.path)
  }
})
</script>

<style scoped>
  .drop-down-item {
    cursor: pointer;
  }
</style>