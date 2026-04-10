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
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
