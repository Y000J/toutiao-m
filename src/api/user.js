/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
//登录
export const login = data => request({
  method: 'POST',
  url: '/app/v1_0/authorizations',
  data
})

// 获取用户自己的信息
export const myInfo = params => request({
  method: 'get',
  url: '/app/v1_0/user',
})
// 获取验证码
export const sendSms = mobile => request({
  method: 'get',
  url: `/app/v1_0/sms/codes/${mobile}`
})

// 获取用户个人资料
export const userData = () => request({
  method: 'get',
  url: '/app/v1_0/user/profile',
})

// 编辑用户个人资料
export const editUserData = params => request({
  method: 'PATCH',
  url: '/app/v1_0/user/profile',
  params
})