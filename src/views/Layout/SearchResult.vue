<template>
<van-nav-bar
  title="文章详情"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<h1>{{a[0]?.title}}</h1>

<div class="body" v-html="a[0]?.content">
</div>

</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'
import { SearchresultApi } from '@/api/index'
export default {

  setup () {
    const a = reactive([])
    const onClickLeft = () => history.back()
    const route = useRoute()
    const id = route.query.id
    const img = ref('')
    onBeforeMount(
      async () => {
        try {
          const res = await SearchresultApi({
            keywrods: id
          }
          )
          a.push(res.data.data)
          console.log(a)
          img.value = res.data.data.aut_photo
          console.log(img._value)
        } catch (err) {
          console.log('失败')
        }
      }
    )

    return {
      onClickLeft,
      // searchresultData,
      a,
      img,
      id

    }
  }
}
</script>

<style>
h1{
  font-size: 14px;

}
.body{

  font-size: 10px
  ;
}
</style>
