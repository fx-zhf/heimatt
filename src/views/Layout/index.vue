<template>
<div>
  <router-view />
<van-tabbar route class="foot">
  <van-tabbar-item replace to="/layout/home" icon="home-o" >首页</van-tabbar-item>
  <van-tabbar-item replace to="/layout/user" icon="setting-o">用户</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {

}
</script>

<style>
/* .foot{
    z-index: 999;
} */
.foot{
  /* background-color:rgba(0, 0, 0, 0.1); */
  height: 50px;

}
</style>
