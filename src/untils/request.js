// 基于axios封装网络请求
import Axios from 'axios'
const axios = Axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})
export default ({ url, method, params, data, headers }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers

  })
}
