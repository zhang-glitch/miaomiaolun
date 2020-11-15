<template>
  <div class="home">
    <Header :user="user" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const user = {
  id: 0,
  name: 'zhanghao',
  isLogin: true
}

export default defineComponent({
  name: 'home',
  components: {
    Header,
    Footer
  },
  setup() {
    return {
      user
    }
  }
})
</script>

<style>

</style>