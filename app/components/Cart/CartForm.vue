<script setup lang="ts">
  const items = [
    {
      name: "Menu Black kebab",
      image: "http://lc-max-kebab.local/wp-content/uploads/2025/11/meniu-black-kebab-150x150.jpg",
      price: 226,
      subtotal: 226,
      qty: 1,
      extras: [
        { label: "Bautura", value: "Coca-Cola" },
        { label: "Sos", value: "Ketchup" },
        { label: "Carne", value: "15 Lei" },
        { label: "Ciuperci", value: "20 Lei" },
        { label: "Sos picant", value: "10 Lei" },
      ],
    },
  ];
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
      <CartRow v-for="(item, i) in items" :key="i" v-bind="item" />
    </div>
    <div class="cart-form__actions">
      <button class="btn cart-form__update-btn" type="button">Actualizează coșul</button>
    </div>
  </div>
</template>
