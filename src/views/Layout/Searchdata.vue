<template>
  <div class="search-header">
    <van-icon name="arrow-left" @click="retreat" class="retreat" />
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      class="input"
      background="#007bff"
      shape="round"
      @update:model-value="update1"
      @blur="keyup"
    />
  </div>
  <!-- 历史记录 -->
  <div
    class="history"
    v-for="(name, index) in history"
    :key="index"
    v-show="value === ''"
  >
    {{ name }}
  </div>
  <!-- 查找列表 -->
  <van-cell
    v-for="obj in search[0]"
    :key="obj.id"
    :title="obj.title"
    v-html="lightFn(obj.title,value)"
    @click="click(obj)"
  >
  </van-cell>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { SearchApi } from '@/api/index'
export default {

  setup () {
    const value = ref('')
    const router = useRouter('')
    let timer = ref('')
    const search = reactive([])
    const history = reactive([])

    const retreat = () => {
      router.push({
        path: '/layout'
      })
    }
    const click = (e) => {
      console.log(e.art_id)

      const id = e.art_id
      router.push({
        path: '/layout/searchresult',
        query: { id: id }
      })
    }
    console.log(value)
    const update1 = () => {
      clearTimeout(timer)
      if (value.value.length === 0) {
        search.length = 0
      } else {
        timer = setTimeout(async () => {
          const res = await SearchApi({
            keywrods: value.value
          })

          console.log(value)
          console.log(res)
          search.length = 0
          search.push(res.data.data.results)
          console.log(search)
        }, 500)
      }
    }
    const keyup = () => {
      if (value.value !== '') {
        console.log(1)
        history.push(value.value)
        console.log(history)
      }
    }

    const lightFn = (originstr, target) => {
      // console.log(toRaw(target)[0])
      console.log(target)
      return originstr.replaceAll(
        target,
        `<span style="color:Red">${target}</span>`
      )
    }

    return {
      value,
      retreat,
      update1,
      search,
      lightFn,
      click,
      history,
      keyup
    }
  }
}
</script>

<style scoped lang='less'>
.retreat {
  display: block;
}
.input {
  display: block;
}
.search-header {
  height: 55px;
  display: flex;
  background-color: #007bff;
  align-items: center;
}
.history {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>
