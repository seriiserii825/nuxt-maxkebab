<script setup lang="ts">
  import { useCartStore } from "~/stores/useCartStore";

  const cart = useCartStore();
</script>

<template>
  <div class="cart-form">
    <div class="cart-form__head">
      <div class="cart-form__head-cell cart-form__head-cell--remove"></div>
      <div class="cart-form__head-cell cart-form__head-cell--thumb"></div>
      <div class="cart-form__head-cell cart-form__head-cell--name">Produs</div>
      <div class="cart-form__head-cell cart-form__head-cell--price">Preț</div>
      <div class="cart-form__head-cell cart-form__head-cell--qty">Cantitate</div>
      <div class="cart-form__head-cell cart-form__head-cell--subtotal">Sub-total</div>
    </div>
    <div class="cart-form__body">
      <CartRow v-for="item in cart.items" :key="item.uid" :item="item" />
    </div>
  </div>
</template>
