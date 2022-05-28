<template>
 <div>
   <router-view></router-view>
 </div>
</template>

<script>
import { getAllChannelsApi } from '@/api'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    router.push('login')// 浏览器开始跳登陆
    const created = async () => {
      try {
        const res = await getAllChannelsApi()
        console.log(res)
      } catch (err) {
        console.dir(err)
      }
    }

    return {
      created
    }
  }

}

</script>

<style>
</style>
