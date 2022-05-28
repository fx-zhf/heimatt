// import request from '@/untils/request.js'
import axios from '@/untils/request.js'
import { getToken } from '@/untils/token'
export const loginApi = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
export const getAllChannelsApi = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
// 获取所有频道
})
export const getUserChannelsApi = () => axios({
  url: '/v1_0/user/channels',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
// 获取个人频道 /v1_0/articles
})
export const getNewsrecommendationApi = ({ channel_id, timestamp }) => axios({
  url: '/v1_0/articles',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    channel_id,
    timestamp
  }
// 获取文章新闻推荐
})
export const getDislikesApi = ({ art_id }) => axios({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: art_id
  }
// 不喜欢文章
})
export const getReportApi = ({ art_id, type }) => axios({
  url: '/v1_0/article/reports',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: art_id,
    type: type,
    remark: '1'
  }
// 文章举报
})
export const ChangeUserChannelsApi = (channel) => axios({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    channels: [channel]
  }
// 改变导航栏
})
export const SearchApi = ({ keywrods }) => axios({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    q: keywrods
  }
// 获取搜索结果
})
// export const SearchresultApi = ({ keywrods }) => axios({
//   url: '/v1_0/articles/:article_id',
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${getToken()}`
//   },
//   params: {
//     article_id: keywrods
//   }
// // 获取新闻详情
// })
export const SearchresultApi = ({ keywrods }) => axios({
  url: `/v1_0/articles/${keywrods}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }

// 获取新闻详情
})
