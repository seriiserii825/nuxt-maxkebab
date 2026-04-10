<script setup lang="ts">
  import type { IProduct } from "~/interfaces/IHomeResponse";

  defineProps({
    products: {
      type: Object as PropType<IProduct[]>,
      required: true,
    },
  });
</script>

<template>
  <div class="related-products">
    <img
      src="/img/single-product-animate-1.png"
      class="related-products__img related-products__img--top-left"
      alt="" />
    <img
      src="/img/single-product-animate-2.png"
      class="related-products__img related-products__img--top-right"
      alt="" />
    <h2 class="related-products__title">Produse similare</h2>
    <div class="related-products__grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
<style lang="scss">
  .related-products {
    position: relative;
    padding-top: 14rem;
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px;
    }
    &__title {
      margin-bottom: 2rem;
      font-size: 4.5rem;
      font-weight: 700;
      line-height: 5.4rem;
      text-transform: uppercase;
    }
    &__img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      &--top-left {
        top: -80px;
        left: -7%;
      }
      &--top-right {
        top: -50px;
        left: initial;
        right: -7%;
      }
    }
  }
</style>
