import request from '@/utils/request'

// 获取用户搜索历史
export const getHistory = () => request({
    methosd: 'get',
    url: '/app/v1_0/search/histories',
})

// 获取用户搜索结果
export const searchResult = params => request({
    methosd: 'get',
    url: '/app/v1_0/search',
    params
})


// 获取用户搜索联想建议
export const searchSuggest = params => request({
    methosd: 'get',
    url: '/app/v1_0/suggestion',
    params
})

// 删除用户搜索历史
export const delSearchHistory = params => request({
    methosd: 'DELETE',
    url: '/app/v1_0/search/histories',
    params
})