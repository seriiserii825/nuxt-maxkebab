<script setup lang="ts">
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const is_visible_dropdown = ref(false);
const currentLocale = computed(() => locales.value.find((l) => l.code === locale.value));

watch(locale, () => {
  is_visible_dropdown.value = false;
});
</script>

<template>
  <div class="language">
    <section class="widget widget_wpglobus" :class="{ active: is_visible_dropdown }">
      <h2 class="widget-title">Alege limba</h2>
      <div class="list flags">
        <NuxtLink
          v-for="locale in locales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          :class="{ 'wpglobus-current-language': locale.code === currentLocale?.code }"
          class="wpglobus-selector-link">
          <img :src="`/img/${locale.img}`" :alt="locale.name" />
          <span class="name">{{ locale.name }}</span>
          <span class="code">{{ locale.code.toUpperCase }}</span>
        </NuxtLink>
      </div>
    </section>
    <div
      @click="is_visible_dropdown = !is_visible_dropdown"
      class="language__btn"
      id="js-language-btn">
      <img :src="`/img/${currentLocale?.img}`" :alt="currentLocale?.name" />
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path
          d="M6.5 3L4 5.5L1.5 3"
          stroke="#231F20"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"></path>
      </svg>
    </div>
  </div>
</template>
