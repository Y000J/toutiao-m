import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 全局样式
import '@/styles/index.less'
import '@/styles/icon.less'
import 'amfe-flexible'
import store from './store'
import '@/utils/day'
import { Form, Button,Badge ,List, Divider ,Loading, Popup, Search, PullRefresh, Field, Dialog, Tab, Tabs, NavBar, Icon, Toast, CountDown, Tabbar, Cell, CellGroup, TabbarItem, Grid, GridItem, Image as VanImage } from 'vant'


Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.config.productionTip = false
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(CountDown);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Loading);
Vue.use(Search);
Vue.use(Divider);
Vue.use(Badge);


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
