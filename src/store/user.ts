import { defineStore } from 'pinia'

declare let SessionStorage: any

export const useUserStore = defineStore('user', {
  state: () => ({ user: SessionStorage.get('USER') || {} }),
  actions: {
    setUser(user) {
      this.user = user
      SessionStorage.set('USER', user)
    },
    removeUser() {
      this.user = {}
      SessionStorage.remove('USER')
    }
  }
})
