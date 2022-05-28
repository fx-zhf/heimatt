<template>
<div class="body" >
<van-nav-bar fixed >
<template #left>
    <img src="@/assets/logo.png" alt="">
</template>
  <template #right>
    <van-icon name="search" size="0.48rem" color="white" @click="gosearch"/>
  </template>
</van-nav-bar >

<div class="top">
    <van-tabs v-model:active="activeName" animated sticky offset-top="1.22666667rem" @change="changeFn" >
  <van-tab v-for="obj in userindex[0]" :title="obj.name " :key="obj.id" :name="obj.id">
<Articleltem></Articleltem>
  </van-tab>
</van-tabs>
<van-icon name="plus" class="plus" size="0.322222rem" @click="plus"></van-icon>
<van-popup v-model:show="show"  position="top" :style="{ height: '100%' }" closeable close-icon="cross"><ChannelEdit @update-data="updateData" @change-data="changeData"></ChannelEdit></van-popup>
</div>
</div>
</template>

<script>
import { getUserChannelsApi } from '@/api/index'
import { onMounted, provide, reactive, ref, computed, toRaw } from 'vue'
import Articleltem from './Articleltem.vue'
import { useStore } from 'vuex'
import ChannelEdit from './ChannelEdit.vue'
import { useRouter } from 'vue-router'

export default {
  components: { Articleltem, ChannelEdit },
  setup () {
    const activeName = ref(0)
    const userindex = reactive([])
    const store = useStore()
    const show = ref(false)
    const router = useRouter()

    onMounted(
      async () => {
        try {
          const res = await getUserChannelsApi()
          userindex.push(res.data.data.channels)
          // userindex1.push(toRaw(userindex).forEach(function (id) {
          //   console.log(id)
          // }))
          // console.log(toRaw(userindex))
          // console.log(toRaw(a))
          // const state =reactive({
          // })
        } catch (err) {
          console.log('失败')
        }
      }

    )
    const state = reactive({
      id: activeName
    })
    const changeFn = (e) => {
      activeName.value = e
      console.log(activeName.value)
    }
    console.log(state.id)
    provide('ac', computed(() => state.id))
    const plus = () => {
      show.value = true
    }
    const updateData = (data) => {
      activeName.value = data.id
      show.value = false
      console.log(data)
      console.log(userindex)
    }
    const changeData = (data) => {
      userindex.length = 0
      userindex.push(toRaw(data))
    }
    const gosearch = () => {
      router.push({
        path: '/layout/search'
      })
    }

    return {
      onMounted,
      userindex,
      activeName,
      store,
      changeFn,
      ...state,
      plus,
      show,
      changeData,
      updateData,
      gosearch

    }
  }
}
</script>

<style scoped lang='less'>
.van-nav-bar{
  background-color:var(--van-blue)
}
/deep/.van-nav-bar__text{
  color:white
}
/deep/.van-nav-bar__icon{
    color: white;
}
img{
    height: 30px;
    width: 30px;
}
.top{
    padding-top: 46px;

}
// .body{
//   padding-bottom: 50px;
// }
.plus{
  z-index: 999;
  position: fixed;
  top:1.45rem;
  right: 0rem;;
  padding:0.2rem;
  background-color: #fff;
}
</style>
