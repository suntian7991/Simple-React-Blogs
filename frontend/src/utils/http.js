import axios from 'axios'
import { getToken, clearToken } from './token'
import { history } from './history'

const http = axios.create({
  // baseURL: 'http://geek.itheima.net/v1_0',
  baseURL: 'http://localhost:3600/api',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  // if not login add token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.dir(error)
  if (error.response.status === 401) {
    clearToken()
    history.push('/login')
  }
  return Promise.reject(error)
})

export { http }