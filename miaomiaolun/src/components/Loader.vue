<template>
  <teleport to="#loader">
    <div class="loader">
      <div class="loader-mask"></div>
      <div class="container">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, onUnmounted } from "vue";

export default defineComponent({
  name: 'Loader',
  setup() {

    const oLoader = document.createElement('div');
    oLoader.id = 'loader'
    document.body.appendChild(oLoader)

    onUnmounted(() => {
      document.body.removeChild(oLoader)
    })
  }
})
</script>

<style scoped>
  .loader {
    width: 100%;
    height: 100%;
  }
  .loader-mask {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
    background: #000000;
    opacity: .4;
    width: 100%;
    height: 100%;
  }

  .spinner-border {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>