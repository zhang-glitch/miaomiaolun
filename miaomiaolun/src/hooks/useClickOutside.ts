import { ref, onMounted, onUnmounted, Ref } from "vue";

const useClickOutside = (refDom: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false);

  const handler = (e: MouseEvent) => {
    // 防止节点为获取到
    if (refDom.value) {
      // 这个函数是判断点击区域是否是下拉菜单。
      if (refDom.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };

  onMounted(() => {
    window.addEventListener("click", handler);
  });

  onUnmounted(() => {
    window.removeEventListener("click", handler);
  });

  return {
    isClickOutside
  };
};

export default useClickOutside;
