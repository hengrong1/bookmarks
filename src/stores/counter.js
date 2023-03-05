import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useBookmarkStore = defineStore('bookmark', {
  state: () => {
    return {
      bookmark: [],
      menuSelected: [],
      showCardType: 0
    }
  },
  persist: {
    enabled: true,
    // strategies: [
    //     { storage: sessionStorage, paths: ['firstName', 'lastName'] }, // firstName 和 lastName字段用sessionStorage存储
    //     { storage: localStorage, paths: ['accessToken'] }, // accessToken字段用 localstorage存储
    // ],
  },
})
