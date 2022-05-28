// 封装3个方法来操作tonken
const key = 'token'
export const setToken = (token) => {
  localStorage.setItem(key, token)
}// 存
export const getToken = () =>
  localStorage.getItem(key)

// 取
export const removeToken = (token) => {
  localStorage.removeItem(key, token)
}// 删
