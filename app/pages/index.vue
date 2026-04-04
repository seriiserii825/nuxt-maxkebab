<script setup lang="ts">
const { locale } = useI18n();
const { data: home, error } = await useFetch("/api/home", {
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
  <div class="index">
    <!-- <UIPrettyPrint v-if="home" :data="home" /> -->
  </div>
</template>
