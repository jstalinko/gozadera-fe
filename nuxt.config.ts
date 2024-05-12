// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
      public:{
        appName: process.env.APP_NAME || 'Mobile Gozadera',
        appDescription: process.env.APP_DESCRIPTION || 'The next generation club',
        apiUrl: process.env.API_URL || 'http://localhost:8000/api',
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Mobile Gozadera',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Meta description' }
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap' },
        { rel: 'stylesheet', href: '/vendor/swiper/css/swiper.min.css' },
        { rel: 'stylesheet', href: '/css/style.css', id: 'style.css' },
        { rel: 'stylesheet', href: '/css/gozadera.css'}
      ],

      script: [
        { src: '/js/jquery-3.3.1.min.js', type: 'text/javascript', defer: true },
        { src: '/js/popper.min.js', type: 'text/javascript', defer: true, body: true },
        { src: '/vendor/bootstrap/js/bootstrap.min.js', type: 'text/javascript', defer: true, body: true },
        { src: '/js/jquery.cookie.js', type: 'text/javascript', defer: true, body: true },
        { src: '/vendor/swiper/js/swiper.min.js', type: 'text/javascript', defer: true, body: true },
        { src: '/js/main.js', type: 'text/javascript', defer: true, body: true },
        { src: '/js/color-scheme-demo.js', type: 'text/javascript', defer: true, body: true },
        { src: '/js/app.js', type: 'text/javascript', defer: true, body: true },
      ]
    },
  },

  modules: ["@pinia/nuxt"]
})