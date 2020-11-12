<template>
  <div class="app">
    <Header :user="user"></Header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import ColumnList, {ColumnProps} from './components/ColumnList.vue'
import Header from './components/Header.vue'
const list: ColumnProps[] = [
  {
    id: 1,
    title: 'iiiiiiiiiiiii',
    avatar: '',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 2,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 3,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 4,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
  {
    id: 5,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  }
] 

const user = {
  id: 0,
  name: 'zhanghao',
  isLogin: true
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    Header
  },
  setup() {
    return {
      list,
      user
    }
  }
})
</script>

<style>
</style>
