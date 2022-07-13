import Vue from 'vue'
import moment from 'moment'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// // moment方法
// import 'moment/locale/zh-cn'
// Vue.filter('relativeTime', val => {
//     return moment(val).startOf('day').fromNow()
// })

Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
}
)