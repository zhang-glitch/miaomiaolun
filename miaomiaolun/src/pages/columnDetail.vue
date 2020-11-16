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
      <post-list :list="postList"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import PostList from '../components/PostList.vue'
import {PostProps, StateProps, ColumnProps} from '../store'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'columnDetail',
  components: {
    PostList
  },
  setup() {
    const store = useStore<StateProps>()
    const route = useRoute()
    const currentId = +route.params.id


    //这里为什么获取会报错
    // //获取所有专栏
    // const columnList: ColumnProps[] = computed(() => {
    //   return store.state.columnList
    // })

    // //获取指定专栏的列表
    // const postListAll: PostProps[] = computed(() => {
    //   return store.state.postList
    // })
    // const postList = postListAll.filter(item => item.columnId === currentId)

    // const column = columnList.find(item => item.id === currentId)

    const column = computed(() => {
      return store.getters.getColumnById(currentId)
    })

    const postList = computed(() => {
      return store.getters.getPostListById(currentId)
    })
    return {
      column,
      postList
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