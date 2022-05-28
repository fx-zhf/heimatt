<template>
  <div>
      <van-nav-bar title="头条---登录"/>
      <van-cell-group inset>
<van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="user.mobile"
      name="mobile"
      label="手机号"
      required
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写用户名',pattern:/^1[2-9]\d{9}$/}]"

    />
    <van-field
      v-model="user.code"
      type="password"
      name="code"
      required
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' ,pattern:/^[1-9][0-9]\d{4}$/}]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit" :loading="isload" :disabled="isload" loading-text="加载中...">
      登录
    </van-button>
  </div>
</van-form>
</van-cell-group>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { loginApi } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/untils/token'
import { useRouter } from 'vue-router'
export default {
  setup () {
    // const mobile = ref('')
    // const password = ref('')
    const user = reactive({
      mobile: '13888888888',
      code: '246810'
    })
    const router = useRouter()
    const isload = ref(false)
    const onSubmit = async () => {
      isload.value = true
      // console.log('submit', values)
      try {
        const { data: res } = await loginApi(user)
        // console.log(res)
        Notify({ type: 'success', message: '登陆成功' })
        setToken(res.data.token)
        // location.href = 'http://localhost:8080/#/layout'// 路径改变的时候浏览器会刷新 （浏览器和跳转地址不同）
        router.push('layout')
      } catch (err) {
        Notify({ type: 'danger', message: '账号或密码无效' })
      }
      isload.value = false
    }
    // onMounted(async () => {
    //   const { data: res } = await loginApi(user)
    //   console.log(res)
    // })

    return {
      user,
      onSubmit,
      isload,
      setToken
    }
  }

}
</script>

<style scoped lang="less">
//scpoed尝试每个标签后面都加data-v 不选中当前标签里的标签
//deep则是将data-v转移到标签名的前面，使用后代选择器的方式往里面找匹配类型
.van-nav-bar{
  // --van-nav-bar-title-text-color:var(--van-white);
  background-color:var(--van-blue);

}
/deep/ .van-nav-bar__title{
  color:white
}

</style>
