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

  const { registerEl } = useImageFloat();
</script>

<template>
  <div class="oferte">
    <img
      :ref="(el) => registerEl(el as HTMLElement)"
      src="/img/single-product-animate-1.png"
      class="oferte__img oferte__img--top-left"
      alt="" />
    <img
      :ref="(el) => registerEl(el as HTMLElement)"
      src="/img/bubbles-dark.png"
      class="oferte__img oferte__img--top-right"
      alt="" />
    <img
      :ref="(el) => registerEl(el as HTMLElement)"
      src="/img/single-product-animate-2.png"
      class="oferte__img oferte__img--top-right-bottom"
      alt="" />
    <div class="container">
      <!-- <UIPrettyPrint v-if="data" :data="data" /> -->
      <ProductBreadcrumb :items="breadcrumbs" />
      <div v-if="data && data.length > 0" class="oferte__wrap">
        <ProductOffer v-for="offer in data" :key="offer.id" :product="offer" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .oferte {
    position: relative;
    padding-top: 22rem;
    padding-bottom: 11rem;
    background: linear-gradient(180deg, #fffef1 80.21%, #f1fff5 100%);
    &__img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      &--top-left {
        top: 38rem;
      }
      &--top-right {
        top: 14rem;
        left: initial;
        right: 0;
      }
      &--top-right-bottom {
        top: 48rem;
        left: initial;
        right: 0;
      }
    }
    &__wrap {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
