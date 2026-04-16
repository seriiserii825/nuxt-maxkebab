<script setup lang="ts">
import type { ShippingMethod } from "~/stores/useShippingStore";

const { t } = useI18n();
const shipping = useShippingStore();
const cityStore = useCityStore();
const cart = useCartStore();

const { currentCity } = storeToRefs(cityStore);
const { have_delivery_free, have_delivery_threshold } = storeToRefs(cart);

const isChisinau = computed(() => currentCity.value?.slug === "chisinau");
const isIaloveni = computed(() => currentCity.value?.slug === "ialoveni");

const chisinauDeliveryCost = computed(() => {
  if (have_delivery_free.value) return 0;
  if (have_delivery_threshold.value) return cart.CHISINAU_DELIVERY_PRICE_THRESHOLD;
  return cart.CHISINAU_DELIVERY_PRICE;
});
</script>

<template>
  <div class="checkout-shipping">
    <button
      type="button"
      class="checkout-shipping__method"
      :class="{ 'checkout-shipping__method--active': shipping.method === 'pickup' }"
      @click="shipping.setMethod('pickup' as ShippingMethod)"
    >
      <span class="checkout-shipping__label">{{ t("shipping.pickup") }}</span>
    </button>

    <button
      type="button"
      class="checkout-shipping__method"
      :class="{ 'checkout-shipping__method--active': shipping.method === 'delivery' }"
      @click="shipping.setMethod('delivery' as ShippingMethod)"
    >
      <span class="checkout-shipping__label">{{ t("shipping.delivery_chisinau") }}</span>
      <span class="checkout-shipping__price">
        <template v-if="isIaloveni">—</template>
        <template v-else-if="isChisinau && have_delivery_free">{{ t("cart.free") }}</template>
        <template v-else-if="isChisinau">{{ chisinauDeliveryCost }} Lei</template>
      </span>
    </button>
  </div>
</template>
