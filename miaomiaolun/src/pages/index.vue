<template>
  <div class="index">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColumnList, {ColumnProps} from "../components/ColumnList.vue";

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
  },
  {
    id: 6,
    title: 'iiiiiiiiiiiii',
    avatar: 'https://pic2.zhimg.com/80/v2-6cc71aa528262ee99461fc57eaafe869_720w.jpg?source=1940ef5c',
    description: 'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
  },
] 
export default defineComponent({
  name: 'index',
  components: {
    ColumnList
  },
  setup() {
    return {
      list
    }
  }
})
</script>

<style>

</style>