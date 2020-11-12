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
          <a href="javascript:;" class="btn btn-outline-light">hi, {{user.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface UserProps {
  id: number,
  isLogin: boolean
  name: string,
}

export default defineComponent({
  name: 'Header',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style>
  .header {
    margin-bottom: 30px;
  }
  .header-box {
    height: 70px; 
    line-height: 70px;
    background: #0084ff!important;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
  }
  .title a{
    font-size: 1.25rem;
    color: #fff;
    text-decoration: none;
  }
  .operate a:first-child {
    margin-right: 15px;
  }
</style>