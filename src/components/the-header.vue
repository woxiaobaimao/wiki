<template>
  <a-layout-header class="header" style="display: flex">
    <div class="logo">文溪知识库</div>
    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
      <a-menu-item key="/">
        <router-link to="/">首页</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/user">
        <router-link to="/admin/user">用户管理</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/ebook">
        <router-link to="/admin/ebook">电子书管理</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/category">
        <router-link to="/admin/category">分类管理</router-link>
      </a-menu-item>
      <a-menu-item key="/about">
        <router-link to="/about">关于我们</router-link>
      </a-menu-item>
    </a-menu>

    <div>
      <a-popconfirm title="确认退出登录?" ok-text="是" cancel-text="否" @confirm="logout()" v-if="user.id">
        <div class="login-menu">
          <span>退出登录</span>
        </div>
      </a-popconfirm>
      <div class="login-menu" v-if="user.id">
        <span>您好：{{ user.name }}</span>
      </div>
      <div class="login-menu" v-if="!user.id" @click="showLoginModal">
        <span>登录</span>
      </div>
    </div>

    <a-modal title="登录" v-model:open="loginModalVisible" :confirm-loading="loginModalLoading" @ok="login">
      <a-form :model="loginUser" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="登录名">
          <a-input v-model:value="loginUser.loginName" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="loginUser.password" type="password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/user'

declare let hexMd5: any
declare let KEY: any

// 登录后保存
const userStore = useUserStore()
const user = computed(() => userStore.user)

// 用来登录
const loginUser = ref({
  loginName: 'zy',
  password: '123456'
})
const loginModalVisible = ref(false)
const loginModalLoading = ref(false)
const showLoginModal = () => {
  loginModalVisible.value = true
}

// 登录
const login = () => {
  loginModalLoading.value = true
  loginUser.value.password = hexMd5(loginUser.value.password + KEY)
  axios.post('/user/login', loginUser.value).then((response) => {
    loginModalLoading.value = false
    const data = response.data
    if (data.success) {
      loginModalVisible.value = false
      userStore.setUser(data.content)
    } else {
      message.error(data.message)
    }
  })
}

// 退出登录
const logout = () => {
  console.log('退出登录开始')
  axios.get('/user/logout/' + user.value.token).then((response) => {
    const data = response.data
    if (data.success) {
      message.success('退出登录成功！')
      userStore.removeUser()
    } else {
      message.error(data.message)
    }
  })
}
</script>

<style>
.logo {
  width: 120px;
  height: 31px;
  /*background: rgba(255, 255, 255, 0.2);*/
  /*margin: 16px 28px 16px 0;*/
  float: left;
  color: white;
  font-size: 18px;
}
.login-menu {
  float: right;
  color: white;
  padding-left: 10px;
}
</style>
