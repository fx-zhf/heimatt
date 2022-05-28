<template>
  <div class="body">
    <van-nav-bar title="频道选择"> </van-nav-bar>
    <h1>我的频道</h1>
    <van-button
      type="danger"
      class="btn"
      @click="bianji"
      plain
      size="mini"
      v-if="num === false"
      >编辑</van-button
    >
    <van-button
      type="danger"
      class="btn"
      @click="bianji();change()"
      plain
      size="mini"
      v-if="num === true"
      >完成</van-button
    >

    <div v-if="num === false">
      <!-- //不能改变我的标签 -->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="obj in userindex[0]"
          :text="obj.name"
          :key="obj.id"
          class="bq"
          @click="update(obj)"
        />
      </van-grid>
    </div>
    <div v-if="num === true">
      <!-- //可以更改我的标签 -->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="obj in userindex[0]"
          :text="obj.name"
          :key="obj.id"
          icon="clear"
          class="bq"
          @click="deleteuser(obj)"
        />
      </van-grid>
    </div>

    <h2>更多频道</h2>
    <div v-if="num === false">
      <!-- 不可以更改状态 -->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="obj in newindex[0]"
          :text="obj.name"
          :key="obj.id"
          class="bq"
        />
      </van-grid>
    </div>
    <div v-if="num === true">
      <!-- 可以更改状态 -->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="obj in newindex[0]"
          :text="'+' + '\t' + obj.name"
          :key="obj.id"
          @click="plus(obj)"
          class="bq"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsApi, getUserChannelsApi, ChangeUserChannelsApi } from '@/api/index'
import { onMounted, reactive, toRaw, ref } from 'vue'

export default {
  emits: ['update-data', 'change-data'],
  setup (props, { emit }) {
    const allindex = reactive([])
    const userindex = reactive([])
    const newindex = reactive([])
    const num = ref(false)
    onMounted(async () => {
      try {
        const res = await getUserChannelsApi()
        const res1 = await getAllChannelsApi()
        console.log(res)
        console.log(res1)

        userindex.push(res.data.data.channels)
        allindex.push(res1.data.data.channels)
        //   newindex = allindex.filter(items => { if (!userindex.includes(items)) return items })
        newindex.push(
          toRaw(allindex[0]).filter(
            (item) => !toRaw(userindex[0]).some((e) => e.id === item.id)
          )
        )
        console.log(
          toRaw(allindex[0]),
          toRaw(userindex[0]),
          toRaw(newindex[0])
        )
      } catch (err) {
        console.log('失败')
      }
    })
    // const click = (e) => {
    //   console.log(e.target)
    //   console.log(e.target.title)
    // }
    const bianji = () => {
      num.value = !num.value
      console.log(num.value)
    }
    const plus = async (e) => {
      console.log(e)

      userindex[0].push(e)
      newindex.length = 0
      newindex.push(
        toRaw(allindex[0]).filter(
          (item) => !toRaw(userindex[0]).some((e) => e.id === item.id)
        )
      )

      console.log(newindex[0].length)
      const res = await ChangeUserChannelsApi({ id: e.id, seq: userindex[0].length })
      console.log(res)
      console.log(toRaw(userindex[0]), toRaw(newindex[0]))
    }
    const deleteuser = async (e) => {
      newindex[0].push(e)
      userindex.length = 0
      userindex.push(
        toRaw(allindex[0]).filter(
          (item) => !toRaw(newindex[0]).some((e) => e.id === item.id)
        )
      )
      const res = await ChangeUserChannelsApi({ id: e.id, seq: newindex[0].length })
      console.log(userindex[0].length)
      console.log(res)
      console.log(toRaw(userindex[0]), toRaw(newindex[0]))
    }
    const update = (e) => {
      emit('update-data', e)
      console.log(e)
    }
    const change = () => {
      emit('change-data', userindex[0])
      console.log(toRaw(userindex[0]))
    }
    return {
      onMounted,
      newindex,

      userindex,
      num,
      bianji,
      plus,
      deleteuser,
      update,
      change
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  font-size: 14px;
}
.btn {
  position: absolute;
  right: 0;
  top: 70px;
  border-radius: 25%;
  z-index: 2;
}
.bq {
  font-size: 10px;
}
/deep/ .van-grid-item {
  .van-icon-clear {
    font-size: 10px;
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 2;
  }
  .van-grid-item__text {
    font-size: 8px;
    margin-right: 0;
  }
}
</style>
