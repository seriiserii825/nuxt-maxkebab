<script setup lang="ts">
  import type { IProduct } from "~/interfaces/IHomeResponse";

  const { t, locale } = useI18n();

  const { data, error } = await useFetch<IProduct[]>("/api/offers", {
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
    <div class="container">
      <!-- <UIPrettyPrint v-if="data" :data="data" /> -->
      <ProductBreadcrumb :items="breadcrumbs" />
      <div v-if="data && data.length > 0" class="oferte__wrap">
        <ProductCard v-for="offer in data" :key="offer.id" :product="offer" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .oferte {
    padding-top: 20rem;
    &__wrap {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
