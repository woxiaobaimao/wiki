import { defineStore } from 'pinia'

declare let SessionStorage: any
const USER = 'USER'

export const useUserStore = defineStore('user', {
  state: () => ({ user: {} }),
  actions: {
    setUser(user) {
      this.user = user
      SessionStorage.set(USER, user)
    },
    removeUser(state) {
      this.user = {}
      SessionStorage.remove(USER)
    }
  }
})
