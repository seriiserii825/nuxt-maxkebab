<script setup lang="ts">
  import type { ShippingMethod } from "~/stores/useShippingStore";

  const { t } = useI18n();
  const cart = useCartStore();
  const cityStore = useCityStore();
  const shipping = useShippingStore();

  const { currentCity } = storeToRefs(cityStore);
  const { have_delivery_base, have_delivery_threshold, have_delivery_free } = storeToRefs(cart);

  const isChisinau = computed(() => currentCity.value?.slug === "chisinau");
  const isIaloveni = computed(() => currentCity.value?.slug === "ialoveni");

  // Reset to pickup when city changes
  watch(currentCity, () => shipping.reset());

  // Chisinau delivery cost depends on cart total thresholds
  const chisinauDeliveryCost = computed(() => {
    if (have_delivery_free.value) return 0;
    if (have_delivery_threshold.value) return cart.CHISINAU_DELIVERY_PRICE_THRESHOLD;
    return cart.CHISINAU_DELIVERY_PRICE;
  });

  const shippingCost = computed(() => {
    if (shipping.method === "pickup") return 0;
    if (isIaloveni.value) return 0; // determined at confirmation
    if (isChisinau.value) return chisinauDeliveryCost.value;
    return 0;
  });

  const grandTotal = computed(() => cart.total + shippingCost.value);

  const cityName = computed(() => currentCity.value ? t(currentCity.value.text) : "");
</script>

<template>
  <div class="cart-total">
    <h2 class="cart-total__title">{{ t("cart.total") }}</h2>
    <div class="cart-total__table">
      <div class="cart-total__row">
        <span class="cart-total__label">{{ t("cart.subtotal") }}</span>
        <span class="cart-total__value">{{ cart.total }} Lei</span>
      </div>

      <div class="cart-total__row cart-total__row--shipping">
        <span class="cart-total__label">{{ t("cart.delivery") }}</span>
        <div class="cart-total__shipping">

          <!-- Ialoveni options -->
          <template v-if="isIaloveni">
            <label class="cart-total__shipping-option">
              <input
                type="radio"
                name="shipping"
                value="delivery"
                :checked="shipping.method === 'delivery'"
                @change="shipping.setMethod('delivery' as ShippingMethod)" />
              {{ t("shipping.delivery_ialoveni") }}
            </label>
            <label class="cart-total__shipping-option">
              <input
                type="radio"
                name="shipping"
                value="pickup"
                :checked="shipping.method === 'pickup'"
                @change="shipping.setMethod('pickup' as ShippingMethod)" />
              {{ t("shipping.pickup") }}
            </label>
          </template>

          <!-- Chisinau options -->
          <template v-else-if="isChisinau">
            <label class="cart-total__shipping-option">
              <input
                type="radio"
                name="shipping"
                value="pickup"
                :checked="shipping.method === 'pickup'"
                @change="shipping.setMethod('pickup' as ShippingMethod)" />
              {{ t("shipping.pickup") }}
            </label>
            <label class="cart-total__shipping-option">
              <input
                type="radio"
                name="shipping"
                value="delivery"
                :checked="shipping.method === 'delivery'"
                @change="shipping.setMethod('delivery' as ShippingMethod)" />
              {{ t("shipping.delivery_chisinau") }}:
              <strong v-if="have_delivery_free">{{ t("cart.free") }}</strong>
              <strong v-else>{{ chisinauDeliveryCost }} Lei</strong>
            </label>
          </template>

          <p v-if="cityName" class="cart-total__shipping-destination">
            {{ t("shipping.destination", { city: cityName }) }}
          </p>
        </div>
      </div>

      <div class="cart-total__row cart-total__row--total">
        <span class="cart-total__label">{{ t("cart.totalLabel") }}</span>
        <span class="cart-total__value">{{ grandTotal }} Lei</span>
      </div>
    </div>
    <div class="cart-total__checkout">
      <NuxtLink to="/checkout" class="btn cart-total__checkout-btn">
        {{ t("cart.checkout") }}
      </NuxtLink>
    </div>
  </div>
</template>
