<script setup lang="ts">
import type { IMenuCategory } from "~/interfaces/IMenuCategory";

const { locale } = useI18n();
const { data: menu, error } = await useFetch<IMenuCategory[]>("/api/menu", {
  query: { lang: locale },
  watch: [locale],
});
if (error.value) {
  showError({
    statusCode: error.value.statusCode ?? 500,
    message: error.value.data?.message ?? error.value.message,
  });
}
</script>

<template>
  <div class="default-layout">
    <LayoutHeader v-if="menu" :menu="menu" />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
