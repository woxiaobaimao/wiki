import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Doc from '../views/doc.vue'
import About from '../views/about.vue'
import AdminEbook from '../views/admin/ebook.vue'
import AdminCategory from '../views/admin/category.vue'
import AdminUser from '../views/admin/user.vue'
import AdminDoc from '../views/admin/doc.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/doc',
    name: 'Doc',
    component: Doc
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/admin/ebook',
    name: 'AdminEbook',
    component: AdminEbook,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/category',
    name: 'AdminCategory',
    component: AdminCategory,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/user',
    name: 'AdminUser',
    component: AdminUser,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/doc',
    name: 'AdminDoc',
    component: AdminDoc,
    meta: {
      loginRequire: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
