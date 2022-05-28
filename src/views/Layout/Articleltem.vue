<template>
  <van-cell-group>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      @select="onSelect"
      teleport="body"
      @cancel="onCancel"
      cancel-text="取消"
    />
    <!-- //一级面板 -->
    <van-action-sheet
      v-model:show="show1"
      :actions="actions1"
      @select="onSelect1"
      teleport="body"
      close-on-click-action
      cancel-text="返回"
      @cancel="onCancel1"
    />
    <!-- //二级面板 -->
    <van-list
      v-model:loading="loading"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
      :immediate-check="false"
    >
      <!-- 上拉加载 -->
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <!-- 下拉刷新 -->
        <van-cell
          v-for="obj in news[0]"
          :title="obj.title"
          :key="obj.art_id"
          :label="
            obj.aut_name +
            '\n' +
            obj.comm_count +
            '评论' +
            '\n' +
            formattime(obj.pubdate)
          "
          class="body1"
          :style="obj.cover.type === 3 ? 'flex-direction: column' : ''"
          @click="fn"
        >
          <!-- 循环渲染每个新闻 -->
          <img
            v-if="obj.cover.type === 1"
            :src="obj.cover.images"
            alt=""
            class="one"

          />
          <!-- //一张图片情况 -->
          <div v-if="obj.cover.type === 3" class="box">
            <img
              v-for="(imgUrl, index) in obj.cover.images"
              :src="imgUrl"
              alt=""
              class="three"
              :key="index"
            />
          </div>
          <!-- //三张图片情况 -->
          <van-icon name="cross" @click.stop="show = true"> </van-icon>
        </van-cell>
      </van-pull-refresh>
    </van-list>
  </van-cell-group>
  <div class="kong"></div>
</template>

<script>
import {
  getNewsrecommendationApi,
  getDislikesApi,
  getReportApi

} from '@/api/index'
import { onMounted, toRaw, inject, ref } from '@vue/runtime-core'
import { reactive } from 'vue'
import { timeAgo } from '@/untils/date.js'
import { Toast, Notify } from 'vant'
import { useRouter } from 'vue-router'

export default {
  // props: ['id'],

  setup () {
    const news = reactive([])
    const news1 = reactive([])
    const formattime = timeAgo
    const id = inject('ac')
    const show = ref(false)
    const show1 = ref(false)
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const router = useRouter()
    const state = reactive({
      id: inject('ac')
    })
    const unlikesid = ref(0)

    let theTime = new Date().getTime()
    // const actions = reactive([])
    onMounted(async () => {
      try {
        const res = await getNewsrecommendationApi({
          channel_id: state.id,
          timestamp: theTime
        })
        news.push(res.data.data.results)
        theTime = res.data.data.pre_timestamp
        console.log(toRaw(news))
      } catch (err) {
        console.log('失败1')
      }
    }) // 初始渲染
    const onLoad = async () => {
      try {
        const res = await getNewsrecommendationApi({
          channel_id: state.id,
          timestamp: theTime
        })
        // toRaw(news.push(res.data.data.results))
        news1.push(res.data.data.results)
        news.push.apply(...toRaw(news), ...toRaw(news1))
        news1.length = 0
        // console.log(toRaw(news1))
        theTime = res.data.data.pre_timestamp
        loading.value = false
        // console.log(toRaw(news1))
      } catch (err) {
        console.log('失败2')
      }
      console.log(theTime)
      if (theTime === null) {
        finished.value = true
      }
    }
    // 上拉加载
    const onRefresh = async () => {
      try {
        const res = await getNewsrecommendationApi({
          channel_id: state.id,
          timestamp: theTime
        })
        news.length = 0
        news.push(res.data.data.results)
        theTime = res.data.data.pre_timestamp
        loading.value = false
        Toast('刷新成功')
      } catch (err) {
        console.log('失败1')
      }
    } // 下拉刷新
    const actions = [{ name: '不感兴趣' }, { name: '举报' }]
    // 一级面板
    const onCancel = () => Toast('取消')
    const onSelect = (item) => {
      show.value = false
      Toast(item.name)
      console.log(item.name)
      if (item.name === '举报') {
        show1.value = true
      } else if (item.name === '不感兴趣') {
        getDislikesApi({
          art_id: unlikesid.value
        })
          .then((r) => console.log(r))
          .catch((e) => {
            console.log(e)
          })
        Notify({ type: 'success', message: '反馈成功' })
      }

      // 一级面板交互
    }
    const actions1 = [
      { name: '选项1', value: 1 },
      { name: '选项2', value: 2 },
      { name: '选项3', value: 3 },
      { name: '选项4', value: 4 }
    ]
    // 二级面板
    const onSelect1 = (item) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      show1.value = false
      Toast(item.name)
      getReportApi({
        art_id: unlikesid.value,
        type: item.value
      })
        .then((r) => console.log(r))
        .catch((e) => {
          console.log(e)
        })
    }
    // 二级面板交互
    const onCancel1 = () => {
      show.value = true
    }
    const fn = (e) => {
      unlikesid.value =
        e.path[2].attributes[0].ownerElement.__vueParentComponent.vnode.key
      // console.log(e.target)
      // console.log(e.getElementById)
      const id = unlikesid.value
      router.push({
        path: '/layout/searchresult',
        query: { id: id }
      })

      console.log(toRaw(unlikesid))
    }
    // const unlike1 = async (unlikesid) => {
    //   const res = await getDislikesApi({
    //     art_id: unlikesid.value
    //   })
    //   console.log(res)
    // }

    return {
      onMounted,
      news,
      formattime,
      id,
      list,
      onLoad,
      loading,
      news1,
      onRefresh,
      actions,
      actions1,
      show,
      show1,
      onSelect,
      onSelect1,
      onCancel,
      onCancel1,
      fn,
      unlikesid
    }
  }
}
</script>
<style>
.one {
  height: 70px;
  width: 113px;
}
.three {
  height: 70px;
  width: 113px;
  float: left;
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.7);
}
.kong {
  height: 50px;
  width: 100%;
}
</style>
