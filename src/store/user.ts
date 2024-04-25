import { defineStore } from 'pinia'

declare let SessionStorage: any
const USER = 'USER'

export const useUserStore = defineStore('user', {
  state: () => ({ user: SessionStorage.get(USER) || {} }),
  actions: {
    setUser(user) {
      this.user = SessionStorage.get(USER) || {}
      SessionStorage.set(USER, user)
    },
    removeUser() {
      this.user = {}
      SessionStorage.remove(USER)
    }
  }
})
