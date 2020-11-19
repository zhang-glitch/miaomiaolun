<template>
  <div class="home">
    <Header :user="user" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import {StateProps} from '../store/index'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'home',
  components: {
    Header,
    Footer
  },
  setup() {
    const store = useStore<StateProps>()
    const user = computed(() => {
      return store.state.user
    })

    //如果存在token,则发送请求
    // if(store.state.token) {
    //   // 发送请求，获取用户信息
    //   store.dispatch('getUser')
    // }
    return {
      user
    }
  }
})
</script>

<style>

</style>