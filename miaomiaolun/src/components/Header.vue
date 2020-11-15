<template>
  <div class="header">
    <div class="container">
      <div class="header-box">
        <div class="title"><a href="javascript:;">淼淼论</a></div>
        <div class="operate" v-if="!user.isLogin">
          <a href="javascript:;" class="btn btn-outline-light">登录</a>
          <a href="javascript:;" class="btn btn-outline-light">注册</a>
        </div>
        <div class="operate" v-else>
          <!-- <a href="javascript:;" class="btn btn-outline-light">hi, {{user.name}}</a> -->
          <drop-down :name="user.name">
            <drop-down-item :class="{'height-light': currentIndex === 0}" @click="changeIndex(0)">新建文章</drop-down-item>
            <drop-down-item :class="{'height-light': currentIndex === 1}" @click="changeIndex(1)">我的专栏</drop-down-item>
            <drop-down-item :class="{'height-light': currentIndex === 2}" @click="changeIndex(2)">编辑资料</drop-down-item>
            <drop-down-item :class="{'height-light': currentIndex === 3}" @click="changeIndex(3)">退出登录</drop-down-item>
          </drop-down>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'

export interface UserProps {
  id: number,
  isLogin: boolean
  name: string,
}

export default defineComponent({
  name: 'Header',
  components: {
    DropDown,
    DropDownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const currentIndex = ref(0)
    const changeIndex = (index: number) => {
      currentIndex.value = index
      console.log(currentIndex.value)
    }
    return {
      currentIndex,
      changeIndex
    }
  }
})
</script>

<style scoped>
  .height-light {
    background: #0084ff;
  }

  .header {
    margin-bottom: 30px;
  }
  .header-box {
    height: 70px; 
    background: #0084ff!important;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
  }
  .title a{
    font-size: 1.25rem;
    line-height: 70px;
    color: #fff;
    text-decoration: none;
  }
  .operate {
    padding-top: 16px;
    box-sizing: border-box;
  }
  .operate a:first-child {
    margin-right: 15px;
  }
  

</style>