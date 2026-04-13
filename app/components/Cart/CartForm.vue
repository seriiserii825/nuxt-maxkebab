<script setup lang="ts">
  import { useCartStore } from "~/stores/useCartStore";

  const cart = useCartStore();
  const { t } = useI18n();
</script>

<template>
  <div class="cart-form">
    <div class="cart-form__head">
      <div class="cart-form__head-cell cart-form__head-cell--remove"></div>
      <div class="cart-form__head-cell cart-form__head-cell--thumb"></div>
      <div class="cart-form__head-cell cart-form__head-cell--name">{{ t("cart.product") }}</div>
      <div class="cart-form__head-cell cart-form__head-cell--price">{{ t("cart.price") }}</div>
      <div class="cart-form__head-cell cart-form__head-cell--qty">{{ t("cart.quantity") }}</div>
      <div class="cart-form__head-cell cart-form__head-cell--subtotal">{{ t("cart.subtotal") }}</div>
    </div>
    <div class="cart-form__body">
      <CartRow v-for="item in cart.items" :key="item.uid" :item="item" />
    </div>
  </div>
</template>
