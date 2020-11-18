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
    <div class="text-center more">
      <button class="btn btn-primary pl-10 pr-10" @click="addMore" v-show="isShow">加载更多</button>
    </div>
    <Loader v-if="isLoading"></Loader>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, reactive } from "vue";
import PostList from '../components/PostList.vue'
import Loader from '../components/Loader.vue'
import {PostProps, StateProps, ColumnProps} from '../store'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'columnDetail',
  components: {
    PostList,
    Loader
  },
  setup() {
    const store = useStore<StateProps>()
    const route = useRoute()
    const currentId = route.params.id

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

    // const column: ComputedRef<ColumnProps> = computed(() => {
    //   return store.getters.getColumnById(currentId)
    // })

    //发送请求，并且获取单个专栏
    store.dispatch('getColumn', currentId)
    const column = computed(() => {
      return store.state.column
    })
    // const postList: ComputedRef<PostProps[]> = computed(() => {
    //   return store.getters.getPostListById(currentId)
    // })

    //获取该专栏的整个文章列表
    const postList = computed(() => {
      return store.state.postList
    })

    // console.log("postList", postList)

    const PageSize = reactive({
      page: '1',
      size: '5',
      id: currentId
    })
    store.dispatch("getPostList", PageSize)

     // 获取专栏的总数量
    const postListCount = computed(() => {
      return store.state.postListCount
    })

    // 加载更多
    const addMore = () => {
      PageSize.size = (+PageSize.size + 1).toString()
      store.dispatch('getPostList', PageSize)
    }

    // 判断是否还要数据，来控制加载按钮的显示和隐藏
    const isShow = computed(() => {
      // 判断是否需要隐藏加载更多按钮
      return store.state.postListCount > postList.value.length ? true : false
    })

    // 获取loading
    const isLoading = computed(() => store.state.loading)
    console.log(isLoading)

    return {
      column,
      postList,
      addMore,
      isShow,
      isLoading
    }
  }
})
</script>

<style scoped>
  
  .more {
    margin: 20px 0 40px;
  }
  .pl-10 , .pr-10 {
    padding: 10px 66px;
  }
</style>