<script setup lang="ts">
  const cart = useCartStore();
  const cityStore = useCityStore();
  const { currentCity } = storeToRefs(cityStore);
  const { have_delivery_base, have_delivery_threshold, have_delivery_free } = storeToRefs(cart);

  const deliveryCost = computed(() => {
    if (!currentCity.value || currentCity.value.slug === "ialoveni") return null;
    if (have_delivery_base.value) return cart.CHISINAU_DELIVERY_PRICE;
    if (have_delivery_threshold.value) return cart.CHISINAU_DELIVERY_PRICE_THRESHOLD;
    return 0;
  });

  const grandTotal = computed(() => {
    if (deliveryCost.value === null || deliveryCost.value === undefined) return cart.total;
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
