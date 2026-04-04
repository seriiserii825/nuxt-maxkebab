// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
  css: ["@/assets/scss/my.scss"],
  modules: ["@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "en", name: "English" },
      { code: "ru", name: "Русский" },
      { code: "ro", name: "Română" },
    ],
    defaultLocale: "en",
    strategy: "prefix", // /en, /ru, /ro
  },
});