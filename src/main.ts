import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import axios from 'axios'
import JSONbig from 'json-bigint' // 导入处理大整数的库
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'
import { Tool } from '@/util/tool'
import { computed } from 'vue'
import { message } from 'ant-design-vue'

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

/**
 * axios拦截器
 */
const userStore = useUserStore()
const user = computed(() => userStore.user)

axios.interceptors.request.use(
  function (config) {
    console.log('请求参数：', config)
    const token = user.value.token
    if (Tool.isNotEmpty(token)) {
      config.headers.token = token
      console.log('请求headers增加token:', token)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function (response) {
    console.log('返回结果：', response)
    return response
  },
  (error) => {
    console.log('返回错误：', error)
    const response = error.response
    const status = response.status
    if (status === 401) {
      // 判断状态码是401 跳转到首页或登录页
      console.log('未登录，跳到首页')
      userStore.removeUser()
      message.error('未登录或登录超时')
      router.push('/')
    }
    return Promise.reject(error)
  }
)
