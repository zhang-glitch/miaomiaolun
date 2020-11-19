<template>
  <div class="header">
    <div class="header-box">
      <div class="title"><a href="/index">淼淼论</a></div>
      <div class="operate" v-if="!user.isLogin">
        <a href="/login" class="btn btn-outline-light">登录</a>
        <a href="/register" class="btn btn-outline-light">注册</a>
      </div>
      <div class="operate" v-else>
        <drop-down :name="user.nickName">
          <drop-down-item path="/create">新建文章</drop-down-item>
          <drop-down-item :path="`/column/${user.column}`">我的专栏</drop-down-item>
          <drop-down-item path="/edit">编辑资料</drop-down-item>
          <drop-down-item path="/login" @click="logout">退出登录</drop-down-item>
        </drop-down>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import {UserProps, StateProps} from '../store/index'
import {useStore} from 'vuex'

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
    const store = useStore<StateProps>();
    const logout = () => {
      store.commit('logout')
    }
    return {logout}
  }
  // setup() {
  //   const currentIndex = ref(0)
  //   const changeIndex = (index: number) => {
  //     currentIndex.value = index
  //     console.log(currentIndex.value)
  //   }
  //   return {
  //     currentIndex,
  //     changeIndex
  //   }
  // }
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