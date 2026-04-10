<script setup lang="ts">
  const { locale } = useI18n();
  const { data, error } = await useFetch("/api/offers", {
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
  <div class="oferte">
    <UIPrettyPrint v-if="data" :data="data" />
  </div>
</template>
