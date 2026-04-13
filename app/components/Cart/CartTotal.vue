<script setup lang="ts">
  import { useCartStore } from "~/stores/useCartStore";
  import { useCityStore } from "~/stores/useCityStore";

  const cart = useCartStore();
  const city = useCityStore();

  const deliveryCost = computed(() => {
    if (city.currentCity?.slug !== "chisinau") return null;
    if (cart.have_delivery_free) return 0;
    if (cart.have_delivery_threshold) return cart.CHISINAU_DELIVERY_PRICE_THRESHOLD;
    return cart.CHISINAU_DELIVERY_PRICE;
  });

  const grandTotal = computed(() => {
    if (deliveryCost.value === null) return cart.total;
    return cart.total + deliveryCost.value;
  });
</script>

<template>
  <div class="cart-total">
    <h2 class="cart-total__title">Total coș</h2>
    <div class="cart-total__table">
      <div class="cart-total__row">
        <span class="cart-total__label">Sub-total</span>
        <span class="cart-total__value">{{ cart.total }} Lei</span>
      </div>
      <div class="cart-total__row">
        <span class="cart-total__label">Livrare</span>
        <span class="cart-total__value">
          <template v-if="deliveryCost === null">—</template>
          <template v-else-if="deliveryCost === 0">Gratuit</template>
          <template v-else>{{ deliveryCost }} Lei</template>
        </span>
      </div>
      <div class="cart-total__row cart-total__row--total">
        <span class="cart-total__label">Total</span>
        <span class="cart-total__value">{{ grandTotal }} Lei</span>
      </div>
    </div>
    <div class="cart-total__checkout">
      <NuxtLink to="/checkout" class="btn cart-total__checkout-btn">
        Continuă cu finalizarea comenzii
      </NuxtLink>
    </div>
  </div>
</template>
