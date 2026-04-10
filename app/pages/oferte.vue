<script setup lang="ts">
  const { t, locale } = useI18n();

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

  const breadcrumbs = ref([
    { label: t("breadcrumbs.home"), to: "/" },
    { label: t("pages.offers") },
  ]);
</script>

<template>
  <div class="oferte">
    <UIPrettyPrint v-if="data" :data="data" />
    <ProductBreadcrumb :items="breadcrumbs" />
  </div>
</template>
