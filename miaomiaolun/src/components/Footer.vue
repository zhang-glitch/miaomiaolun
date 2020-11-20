<template>
  <div class="footer">
    <div class="container">
        <ul class="row">
          <li class="col"><a href="http://39.97.212.45:3000/">淼昊的个人博客</a></li>
          <li class="col"><span>|</span></li>
          <li class="col"><a href="https://github.com/zhang-glitch">淼昊的github</a></li> 
          <li class="col"><span>|</span></li>
          <li class="col"><a href="https://juejin.im/user/2225067267204935">淼昊的掘金</a></li>
          <li class="col"><span>|</span></li>
          <li class="col"><a href="https://www.zhihu.com/people/hao-hao-25-36-48">淼昊的知乎</a></li>    
        </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";


export default defineComponent({
  name: 'Footer',

})
</script>

<style scoped>
  .footer {
    height: 80px;
    line-height: 80px;
    background: #000000;
    opacity: .8;
    /* position: absolute;
    left: 0;
    right: 0;
    bottom: 0; */
  }
  ul {
    list-style-type: none;
  }


  li a {
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
  }

  li{
    text-align: center;
  }
</style>