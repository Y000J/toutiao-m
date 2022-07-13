import request from "@/utils/request";


// 获取用户频道列表
export const getUserChannelList = () => request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
})

// 获取全部频道列表
export const getUserAllChannel = () => request({
    method: 'Get',
    url: '/app/v1_0/channels'
})

// 删除指定用户频道
export const deleteAssignChannel = params => request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${params}`
})

//添加指定频道列表
export const addChannel = params => request({
    method: 'PUT',
    url: `/app/v1_0/user/channels/${params.target}`,
    data: params.Body
})

