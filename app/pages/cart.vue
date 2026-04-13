<script setup lang="ts">
  const { t } = useI18n();
</script>

<template>
  <div class="page-cart">
    <div class="container">
      <h1 class="page-cart__title">{{ t("cart.title") }}</h1>
      <CartForm />
      <div class="page-cart__collaterals">
        <CartResume />
        <CartTotal />
      </div>
    </div>
  </div>
</template>
