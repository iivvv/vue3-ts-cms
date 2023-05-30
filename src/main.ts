import './assets/css/index.less'

import { createApp } from 'vue'
// import ElementPlus from 'element-plus' //全局引入element-plus
// import 'element-plus/dist/index.css' //全局引入element-plus
import App from './App.vue'
import router from './router'
import registerStore from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //注册所有图标

const app = createApp(App)

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(ElementPlus) //全局引入element-plus
app.use(registerStore)
app.use(router)

app.mount('#app')
