<script setup lang="ts">
import type { CartItem } from "~/stores/useCartStore";

const props = defineProps<{ loading?: boolean }>();
const emit = defineEmits<{ submit: [] }>();
const { t } = useI18n();
const cart = useCartStore();
const cityStore = useCityStore();
const shipping = useShippingStore();

const { currentCity } = storeToRefs(cityStore);
const { have_delivery_free, have_delivery_threshold } = storeToRefs(cart);

const isChisinau = computed(() => currentCity.value?.slug === "chisinau");
const isIaloveni = computed(() => currentCity.value?.slug === "ialoveni");

const chisinauDeliveryCost = computed(() => {
  if (have_delivery_free.value) return 0;
  if (have_delivery_threshold.value) return cart.CHISINAU_DELIVERY_PRICE_THRESHOLD;
  return cart.CHISINAU_DELIVERY_PRICE;
});

const shippingCost = computed(() => {
  if (shipping.method === "pickup") return 0;
  if (isIaloveni.value) return 0;
  if (isChisinau.value) return chisinauDeliveryCost.value;
  return 0;
});

const grandTotal = computed(() => cart.total + shippingCost.value);

function getItemPrice(item: CartItem) {
  const extras =
    (item.additions?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0) +
    (item.sauces?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0);
  return item.basePrice + extras;
}
</script>

<template>
  <div class="checkout-summary">
    <h2 class="checkout-summary__title">{{ t("checkout.orderTitle") }}</h2>

    <div class="checkout-summary__list">
      <div v-for="item in cart.items" :key="item.uid" class="checkout-summary__item">
        <div class="checkout-summary__item-thumb">
          <img :src="item.image" :alt="item.title" />
        </div>
        <div class="checkout-summary__item-info">
          <div class="checkout-summary__item-name">{{ item.title }}</div>
          <ul v-if="item.options?.length" class="checkout-summary__item-extras">
            <li v-for="opt in item.options" :key="opt.label" class="checkout-summary__item-extra">
              {{ opt.label }}: {{ opt.value }}
            </li>
          </ul>
          <div class="checkout-summary__item-qty">× {{ item.qty }}</div>
        </div>
        <div class="checkout-summary__item-price">{{ getItemPrice(item) * item.qty }} Lei</div>
      </div>
    </div>

    <div class="checkout-summary__totals">
      <div class="checkout-summary__total-row">
        <span class="checkout-summary__total-label">{{ t("checkout.subtotal") }}</span>
        <span class="checkout-summary__total-value">{{ cart.total }} Lei</span>
      </div>
      <div class="checkout-summary__total-row">
        <span class="checkout-summary__total-label">{{ t("checkout.delivery") }}</span>
        <span class="checkout-summary__total-value">
          <template v-if="shipping.method === 'pickup'">{{ t("shipping.pickup") }}</template>
          <template v-else-if="isIaloveni">—</template>
          <template v-else-if="have_delivery_free">{{ t("cart.free") }}</template>
          <template v-else>{{ shippingCost }} Lei</template>
        </span>
      </div>
      <div class="checkout-summary__total-row checkout-summary__total-row--grand">
        <span class="checkout-summary__total-label">{{ t("checkout.total") }}</span>
        <span class="checkout-summary__total-value">{{ grandTotal }} Lei</span>
      </div>
    </div>

    <button
      type="button"
      class="checkout-summary__submit"
      :class="{ 'checkout-summary__submit--loading': props.loading }"
      :disabled="props.loading"
      @click="emit('submit')"
    >
      {{ props.loading ? t("checkout.placing") : t("checkout.placeOrder") }}
    </button>
  </div>
</template>
