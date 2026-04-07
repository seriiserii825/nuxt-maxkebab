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
  <div class="language-selector">
    <section class="language-selector__dropdown" :class="{ active: is_visible_dropdown }">
      <h2 class="language-selector__title">
        {{ $t('languageSelector.title') }}
      </h2>
      <div class="language-selector__list">
        <NuxtLink
            v-for="lc in locales"
            :key="lc.code"
            :to="switchLocalePath(lc.code)"
            :class="{ active: lc.code === currentLocale?.code }"
            class="language-selector__item">
        <img :src="`/img/${lc.img}`" :alt="lc.name" />
        <span class="name">{{ lc.name }}</span>
        <span class="code">{{ lc.code.toUpperCase() }}</span>
        </NuxtLink>
      </div>
    </section>
    <button @click="is_visible_dropdown = !is_visible_dropdown" class="language-selector__btn">
      <img :src="`/img/${currentLocale?.img}`" :alt="currentLocale?.name" />
      <IconDown />
    </button>
  </div>
</template>
