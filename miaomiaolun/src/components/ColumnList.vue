<template>
  <div class="colum-list">
    <div class="container">
      <div class="row">
        <div class="col-4 mb-4"  v-for="item in columnList" :key="item._id">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <img class="rounded-circle border border-light w-25 my-3" :src="item.avatar.url" alt="item.title">
              <h5 class="card-title">{{item.title}}</h5>
              <p class="card-text text-left">{{item.description}}</p>
              <router-link class="btn btn-outline-primary" :to="`/column/${item._id}`">进入专栏</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue';
import {ColumnProps} from '../store'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(item => {
        if(!item.avatar) {
          item.avatar = {
            url: require("../assets/avatar.jpg")
          }
        }
        return item
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style scoped>
  .card {
    position: relative;
  }
  .card-text {
    margin-bottom: 60px;
  }
  .btn {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%);
  }
</style>