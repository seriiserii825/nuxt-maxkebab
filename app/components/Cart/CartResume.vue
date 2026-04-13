<script setup lang="ts">
  import type { IProduct } from "~/interfaces/IHomeResponse";

  const cart = useCartStore();
  const { locale } = useI18n();

  const exclude = computed(() => [...new Set(cart.items.map((i) => i.id))].join(","));

  const { data: products } = await useFetch<IProduct[]>("/api/random-products", {
    query: { locale, exclude },
  });
</script>

<template>
  <div v-if="products?.length" class="cart-resume">
    <h2 class="cart-resume__title">S-ar putea să te intereseze…</h2>
    <div class="cart-resume__grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
