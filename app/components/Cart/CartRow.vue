<script setup lang="ts">
  defineProps<{
    name: string;
    image: string;
    price: number;
    subtotal: number;
    qty: number;
    extras: { label: string; value: string }[];
  }>();
</script>

<template>
  <div class="cart-row">
    <div class="cart-row__remove">
      <button class="cart-row__remove-btn" type="button" aria-label="Elimină">×</button>
    </div>
    <div class="cart-row__thumb">
      <img :src="image" :alt="name" />
    </div>
    <div class="cart-row__info">
      <span class="cart-row__name">{{ name }}</span>
      <ul class="cart-row__extras">
        <li v-for="(extra, i) in extras" :key="i" class="cart-row__extra">
          <span class="cart-row__extra-label">{{ extra.label }}</span>
          <span class="cart-row__extra-value">{{ extra.value }}</span>
        </li>
      </ul>
    </div>
    <div class="cart-row__price">{{ price }} Lei</div>
    <div class="cart-row__qty">
      <UIQuantitySelector />
    </div>
    <div class="cart-row__subtotal">{{ subtotal }} Lei</div>
  </div>
</template>
