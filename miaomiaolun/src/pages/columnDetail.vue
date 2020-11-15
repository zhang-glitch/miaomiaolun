<template>
  <div class="column-detail w-75 mx-auto">
    <!-- 这里是根据id来获取对应的column，用于个人列表顶部的渲染。 -->
     <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
        <div class="col-3 text-center">
          <img src="../assets/avatar.jpg" :alt="column.title" class="rounded-circle border border-light w-50">
        </div>
        <div class="col-9">
          <h4>{{column.title}}</h4>
          <p class="text-muted">{{column.description}}</p>
        </div>
      </div>
      <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {ColumnProps} from '../components/ColumnList.vue';
import PostList, {PostProps} from '../components/PostList.vue'

const column: ColumnProps = {
    id: 1,
    title: 'iiiiiiiiiiiii',
    avatar: '../assets/avatar.jpg',
    description: '哈哈哈哈达瓦大大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多多多多多'
  }


const list: PostProps[] = [
  {
    id: 1,
    title: 'iiiiiiiiiiiii',
    image: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    content: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    createdAt: '2020/11/15 15:16'
  },
  {
    id: 2,
    title: 'iiiiiiiiiiiii',
    image: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    content: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    createdAt: '2020/11/15 15:16'
  },
  {
    id: 3,
    title: 'iiiiiiiiiiiii',
    image: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    content: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    createdAt: '2020/11/15 15:16'
  },
  {
    id: 4,
    title: 'iiiiiiiiiiiii',
    image: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    content: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    createdAt: '2020/11/15 15:16'
  }
]
  

export default defineComponent({
  name: 'columnDetail',
  components: {
    PostList
  },
  setup() {
    return {
      column,
      list
    }
  }
})
</script>

<style>
  .text-muted {
    /* width: 882px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }
</style>