/**
 * 请求模块
 */

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  // 自定义后端返回原始数据,解决大数字无法正确解析问题
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONBig.parse(data)
    } catch (err) {
      console.log(err);
      return data;
      // return JSON.stringify(data)
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 发送请求之前做什么
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  // 处理请求错误
  return Promise.reject(error)
})

// 响应拦截器

export default request
