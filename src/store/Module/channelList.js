import { getUserChannelListAPI } from "@/api";

export default {
    namespaced: true,
    state: {
        channelList: []
    },
    mutations: {
        updateChannelList(state, payload) {
            state.channelList = payload
        }
    },
    actions: {
        async getChannelList(context) {
            try {
                const { data } = await getUserChannelListAPI();
                context.commit('updateChannelList', data.data.channels)
            } catch (err) {
                this.$toast("请求失败！" + err);
            }
        }
    }
}