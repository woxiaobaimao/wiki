import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import axios from 'axios'
import JSONbig from 'json-bigint' // 导入处理大整数的库
import { createPinia } from 'pinia'

axios.defaults.baseURL = process.env.VUE_APP_SERVER

const app = createApp(App)
const pinia = createPinia()
app.config.warnHandler = () => {} // 禁用所有警告
app.use(Antd).use(pinia).use(router).mount('#app')

axios.defaults.transformResponse = [
  function (data) {
    try {
      // 尝试使用 JSONbig.parse() 解析响应数据
      return JSONbig.parse(data)
    } catch (error) {
      // 如果解析失败，返回原始数据
      return data
    }
  }
]
console.log('环境：', process.env.NODE_ENV)
console.log('服务端：', process.env.VUE_APP_SERVER)
