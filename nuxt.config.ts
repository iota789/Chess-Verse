import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  ssr: false, 
  app: {
    baseURL: '/Chess-Verse/',   
    buildAssetsDir: 'assets'
  },
  nitro: {
    preset: 'github_pages'
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: [
        '@primevue/nuxt-module'
    ],
  primevue: {
        options: {
            theme: {
                preset: Aura,
                dark: false
            }
        }
    },
   devServer: {
      port: 4040
    },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});