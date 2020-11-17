<template>
  <div class="post-list">
    <article v-for="item in list" :key="item._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <!-- 通往文章的详情页 -->
        <h4><router-link :to="`/posts/${item._id}`">{{item.title}}</router-link></h4>
        <div class="row my-3 align-items-center">
          <div v-if="item.image" class="col-4">
            <img :src="item.image.url" :alt="item.title" class="rounded-lg w-50">
          </div>
          <p :class="{'col-8': item.image}" class="text-muted">{{item.excerpt}}</p>
        </div>
        <span class="text-muted">{{item.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {PostProps} from '../store'


export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
})
</script>

<style>
  .post-list h4 a {
    text-decoration: none;
    color:#1a1a1a;
  }
  .post-list h4 a:hover {
    color:#0d6efd;
  }
</style>