<template>
  <a-layout-footer style="text-align: center">
    文溪知识库<span v-show="user.id">，欢迎：{{ user.name }}</span>
  </a-layout-footer>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { Tool } from '@/util/tool'
import { notification } from 'ant-design-vue'

// 登录后保存
const userStore = useUserStore()
const user = computed(() => userStore.user)

let websocket: any
let token: any
const onOpen = () => {
  console.log('WebSocket连接成功，状态码：', websocket.readyState)
}
const onMessage = (event: any) => {
  console.log('WebSocket收到消息：', event.data)
  notification['info']({
    message: '收到消息',
    description: event.data
  })
}
const onError = () => {
  console.log('WebSocket连接错误，状态码：', websocket.readyState)
}
const onClose = () => {
  console.log('WebSocket连接关闭，状态码：', websocket.readyState)
}
const initWebSocket = () => {
  // 连接成功
  websocket.onopen = onOpen
  // 收到消息的回调
  websocket.onmessage = onMessage
  // 连接错误
  websocket.onerror = onError
  // 连接关闭的回调
  websocket.onclose = onClose
}

onMounted(() => {})
</script>
