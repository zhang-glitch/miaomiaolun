<template>
  <div class="post-detail">
    <div class="container">
      <!-- 面包屑 -->
      <div class="row detail">
        <div class=" col-8">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">首页</a></li>
            <li class="breadcrumb-item"><a :href="`/column/${postDetailVal.column}`">专栏首页</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{postDetailVal.title}}</li>
          </ol>
          <div class="detail-box">
            <div class="mb-5" v-if="postDetailVal.image">
              <img :src="postDetailVal.image.url" class="img-fluid" alt="Responsive image">
            </div>
            <h3 class="mb-4">{{postDetailVal.title}}</h3>
            <div class="border-top border-bottom py-3 mb-3 align-items-center row g-0">
              <div class="col d-flex user">
                <div class="user-box">
                  <div class="img d-flex align-items-center" v-if="postDetailVal.author">
                    <img :src="postDetailVal.author.avatar.url" alt="" class="rounded-circle img-thumbnail">
                    <div class="info ml-2">
                      <h5>{{postDetailVal.author.nickName}}</h5>
                      <p class="text-truncate text-muted d-block">{{postDetailVal.author.description}}</p>
                    </div>
                  </div>
                </div>
                <div class="time">
                  <i>发表于: {{postDetailVal.createdAt}}</i>
                </div>
              </div>
            </div>
            <div class="content">
              <p v-html="postDetailVal.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {useStore} from 'vuex'
import { StateProps } from '../store';
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'postDetail',
  setup() {
    const store = useStore<StateProps>()
    const route = useRoute()
    const id = route.params.id
    store.dispatch('getPostDetail', id)
    const postDetailVal = computed(() => store.state.postDetail)
    console.log(postDetailVal)
    return {
      postDetailVal
    }
  }
})
</script>

<style scoped>
  .breadcrumb-item a {
    text-decoration: none;
  }

  .detail {
    display: flex;
    justify-content: center;
  }

  .img img {
    width: 50px;
    height: 50px;
  }

  .info {
    margin-bottom: -20px;
  }

  .user {
    justify-content: space-between;
    align-items: center;
  }


  .content {
    background: #f8f9fa;
    padding: 20px;
  }

  .detail-box {
    margin-bottom: 100px;
  }

</style>