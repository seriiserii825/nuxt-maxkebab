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
    defaultLocale: "ro",
    locales: [
      { code: "ro", name: "Română", file: "ro.json", img: "ro.png" },
      { code: "ru", name: "Русский", file: "ru.json", img: "ru.png" },
      { code: "en", name: "English", file: "en.json", img: "en.png" },
    ],
  },
});

