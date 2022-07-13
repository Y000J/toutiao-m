// 评论请求模块

import request from '@/utils/request'
// 获取评论
export const getComment = params => request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
})

// 评论点赞
export const commendComment = params => request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data:params
})

// 取消评论点赞
export const delCommendComment = params => request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${params}`,
})

// 添加评论
export const addComment = params => request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data:params
})