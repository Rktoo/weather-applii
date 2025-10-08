export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  pages: true,
  ssr: true,
  
  nitro: {
    routeRules: {
      '/weather/**': { swr: 1800 },
      '/api/weather/**': { cache: { maxAge: 1800 } }
    }
  },
  
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.open-meteo.com/v1'
    }
  },
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})