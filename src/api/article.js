import request from "@/utils/request";

export const articleList = params => request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
})

// 获取文章详情
export const articleDetails = params => request({
    method: 'GET',
    url: `/app/v1_0/articles/${params}`,
})

// 关注用户
export const followUser = params => request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: params
})

// 取消关注用户
export const unfollowUser = params => request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${params}`,
})

// 收藏文章
export const collectArticle = params => request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: params
})

//取消收藏文章
export const uncollectArticle = params => request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${params}`,
})

// 对文章点赞
export const praise = params => request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: params
})

// 取消对文章点赞
export const removePraise = params => request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${params}`,
})