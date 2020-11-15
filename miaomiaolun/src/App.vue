<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"

export default defineComponent({
  name: 'App',
})
</script>

<style>
</style>
