<script setup lang="ts">
  import type { IDeliveryResponse } from "~/interfaces/IDeliveryResponse";

  const { t, locale } = useI18n();

  const { data, error } = await useFetch<IDeliveryResponse>("/api/delivery", {
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
    { label: t("pages.delivery") },
  ]);
</script>

<template>
  <div class="delivery-page">
    <div v-if="data?.image" class="delivery-page__head-image">
      <img :src="data.image" alt="" />
    </div>

    <div class="delivery-page__body">
      <div class="container">
        <ProductBreadcrumb :items="breadcrumbs" />
        <UIAccordion v-if="data?.items?.length" :items="data.items" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .delivery-page {
    padding-top: 12rem;
    background: linear-gradient(180deg, #fffef1 80.21%, #f1fff5 100%);
    min-height: 100vh;

    &__head-image {
      width: 100%;
      height: 40rem;
      overflow: hidden;

      @media screen and (max-width: 768px) {
        height: 25rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    &__body {
      padding: 4rem 0 11rem;

      @media screen and (max-width: 992px) {
        padding-top: 3rem;
      }
    }
  }
</style>
