import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import store from './store'
import './api/mock.js'
import api from './api/api.js'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 加载路由
store.commit("addMenu", router);
// 路由匹配
function checkRouter(path) {
  let hasCheck = router.getRoutes().filter(route => route.path == path).length;
  if (hasCheck) {
    return true;
  } else {
    return false;
  }
}
// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.token;
  if (!token && to.name !== 'login') {
    next({
      name: 'login',
    })
  } else if (!checkRouter(to.path)) {
    next({
      name: 'home',
    })
  } else {
    next();
  }
})

app.config.globalProperties.$api = api;
app.use(router).use(store)
app.mount('#app')
