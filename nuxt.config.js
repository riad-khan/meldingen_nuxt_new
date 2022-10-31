// https://v3.nuxtjs.org/api/configuration/nuxt.config


export default defineNuxtConfig({
    app: {
        head: {
          charset: 'utf-16',
          viewport: 'width=500, initial-scale=1', 
          meta: [
          
            { name: 'robots', content: 'noindex' }
          ],
        }
      },
    css: [

        '@/assets/css/normalize.css',
        '@/assets/css/style.css',
        '@/assets/css/responsive.css'
    ],


    axios: {
        baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
    },

    runtimeConfig: {
        public: {
            api: process.env.NUXT_API_URL,
            backend: process.env.NUXT_APP_LARAVEL_URL,
        }
    },
    ssr: true,


})
