// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    wooKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    wooSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    wpApiSecret: process.env.WP_API_SECRET,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpFrom: process.env.SMTP_FROM,
    smtpTo: process.env.SMTP_TO,
    public: {
      apiBase: process.env.NUXT_PUBLIC_WP_URL,
      wooUrl: process.env.WOOCOMMERCE_URL,
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "swiper/vue",
        "swiper/modules",
        "@pinia-plugin-persistedstate/nuxt",
      ],
    },
  },
  css: ["@/assets/scss/my.scss"],
  modules: ["@nuxtjs/i18n", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  i18n: {
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    defaultLocale: "ro",
    locales: [
      { code: "ro", name: "Română", file: "ro.json", img: "ro.png" },
      { code: "ru", name: "Русский", file: "ru.json", img: "ru.png" },
      { code: "en", name: "English", file: "en.json", img: "en.png" },
    ],
  },
});

