export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cloudemdr-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs:{
      id: 'component-page',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://bulkit.cssninja.io/assets/css/app.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://bulkit.cssninja.io/assets/css/core.css',
      },
    ],
    script: [
      {
        type: 'text/javascript',
        src: '/js/app.js',
        defer: true,
      },
      {
        type: 'text/javascript',
        src: '/js/core.js',
        defer: true,
      },
      {
        src: 'https://code.jquery.com/jquery-3.6.0.min.js',
        integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
        crossorigin: 'anonymous'
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/dot.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
