import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      
      if (typeof document !== 'undefined') {
        if (this.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        
        // Save dans le localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
        }
      }
    },
    
    initTheme() {
      if (typeof window === 'undefined') return
      
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      this.isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
      
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      }
    }
  }
})