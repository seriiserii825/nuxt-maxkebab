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
    <div class="related-products__grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
<style lang="scss">
  .related-products {
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px;
    }
  }
</style>
