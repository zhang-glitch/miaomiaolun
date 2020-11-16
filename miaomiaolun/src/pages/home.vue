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
    return {
      user
    }
  }
})
</script>

<style>

</style>