import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "nuxt-icon", 
    "@nuxtjs/google-fonts",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
    }
  ],
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  typescript: {shim: false},
  build: {transpile: ["vuetify"] },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

})
