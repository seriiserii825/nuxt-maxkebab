<script setup lang="ts">
  const { t } = useI18n();
  const cartStore = useCartStore();
</script>

<template>
  <div class="page-cart">
    <div class="container">
      <h1 class="page-cart__title">{{ t("cart.title") }}</h1>
      <template v-if="cartStore.count === 0">
        <p class="page-cart__empty">{{ t("cart.empty") }}</p>
        <NuxtLink to="/" class="page-cart__back">{{ t("cart.backToShop") }}</NuxtLink>
      </template>
      <template v-else>
        <CartForm />
        <div class="page-cart__collaterals">
          <CartResume />
          <CartTotal />
        </div>
      </template>
    </div>
  </div>
</template>
