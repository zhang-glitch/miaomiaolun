<template>
  <div class="index">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="/create" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="columnList"></column-list>
    <div class="text-center more">
      <button class="btn btn-primary pl-10 pr-10" @click="addMore" v-show="isShow">加载更多</button>
    </div>
    <!-- 这里只能用v-if，不能用v-show -->
    <Loader v-if="isLoading"></Loader>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
import ColumnList from "../components/ColumnList.vue";
import Loader from '../components/Loader.vue'
import { ColumnProps, StateProps } from '../store';
import {useStore} from 'vuex'
export default defineComponent({
  name: 'index',
  components: {
    ColumnList,
    Loader
  },
  setup() {
    const store = useStore<StateProps>()
    //获取全部的专栏数据
    const columnList = computed(() => {
      return store.state.columnList
    })

    //规定请求数据的参数
    const PageSize = reactive({
      page: "1",
      size: "6"
    });
    //发送请求
    store.dispatch('getColumnList', PageSize) 


    // 获取专栏的总数量
    const columnListCount = computed(() => {
      return store.state.columnListCount
    })

    // 加载更多
    const addMore = () => {
      PageSize.size = (+PageSize.size + 2).toString()
      store.dispatch('getColumnList', PageSize)
    }

    // 判断是否还要数据，来控制加载按钮的显示和隐藏
    const isShow = computed(() => {
      // 判断是否需要隐藏加载更多按钮
      return store.state.columnListCount > columnList.value.length ? true : false
    })

    const isLoading = computed(() => store.state.loading)
    return {
      columnList,
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