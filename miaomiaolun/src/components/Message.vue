<template>
 <teleport to="#message">
    <div class=" message alert message-info fixed-top  mx-auto d-flex justify-content-between mt-2">
      <div class="alert" :class="`alert-${alertType.type}`" role="alert">
        {{alertType.message}}
      </div>
    </div>
 </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType } from "vue";
export  interface AlertTypeProps {
  type: 'success' | "danger" | 'warning';
  message?: string;
}
export default defineComponent({
  name: 'Message',
  props: {
    alertType: {
      type: Object as PropType<AlertTypeProps>,
      required: true
    }
  },
  setup(props) {
    const oDiv = document.createElement('div');
    oDiv.id = "message"
    document.body.appendChild(oDiv)
    // console.log(props)
    onUnmounted(() => {
      document.body.removeChild(oDiv)
    })
  }
})
</script>

<style scoped>
  .message {
    margin: 0 auto;
  }
  .alert {
    width:500px;
    text-align: center;
  }
</style>