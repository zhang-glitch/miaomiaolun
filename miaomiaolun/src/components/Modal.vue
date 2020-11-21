<template>
  <teleport to="#modal">
    <div class="modal-component">
      <div class="mask"></div>
      <div class="modal-box">
        <button type="button" class="ml-2 mb-1 close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="body">
          <slot name="body"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: 'Modal',
  emits: ['close-modal'],
  setup(props, context) {
    // 创建一个节点
    const oDiv = document.createElement('div');
    oDiv.id = "modal"
    document.body.appendChild(oDiv)
    // console.log(props)
    onUnmounted(() => {
      document.body.removeChild(oDiv)
    })

    // 发送事件控制会话框
    const closeModal = () => {
      console.log('dwdad')
      context.emit('close-modal')
    }
    return {
      closeModal
    }
  }
})
</script>

<style scoped>
  .mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    background: #000000;
    opacity: .4;
  }

  .modal-box {
    background: #ffffff;
    width: 400px;
    height: 300px;
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translate(-50%);
    z-index: 11;
    padding: 20px 30px;
  }

  .close {
    position: absolute;
    top: 8px;
    right: 15px;    
    border: none;
    font-size: 30px;
    background: #ffffff;
  }

  .title {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;
  }

  .body {
    font-size: 20px;
    margin-top: 30px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 20px;
  }

  .footer {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }

</style>