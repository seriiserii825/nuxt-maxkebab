<script setup lang="ts">
  const { t } = useI18n();

  const cartStore = useCartStore();
  const { total, have_delivery_base, have_delivery_free, have_delivery_threshold, threshold_left } =
    storeToRefs(cartStore);
  const cityStore = useCityStore();
  const { currentCity } = storeToRefs(cityStore);
  const price = computed(() => {
    if (have_delivery_base.value) {
      return cartStore.CHISINAU_DELIVERY_PRICE;
    } else if (have_delivery_threshold.value) {
      return cartStore.CHISINAU_DELIVERY_PRICE_THRESHOLD;
    } else {
      return 0;
    }
  });
</script>

<template>
  <section v-if="total > 0" class="shipping-cost">
    <span v-if="currentCity && currentCity.slug == 'ialoveni'" class="shipping-cost__label">
      {{ t("shipping_cost.ialoveni") }}
    </span>
    <template v-else>
      <div class="shipping-cost__item" v-if="!have_delivery_free">
        <span class="shipping-cost__label">{{ t("shipping_cost.chisinau.curier") }}</span>
        <span class="shipping-cost__price">{{ price }} MDL</span>
      </div>
      <div class="shipping-cost__remaining" v-if="have_delivery_base">
        {{ t("shipping_cost.chisinau.base.before") }}
        {{ cartStore.CHISINAU_DELIVERY_PRICE_THRESHOLD }} MDL
        {{ t("shipping_cost.chisinau.base.after") }}: {{ threshold_left }} MDL
      </div>
      <div
        class="shipping-cost__remaining shipping-cost__remaining--available"
        v-if="have_delivery_threshold">
        {{ t("shipping_cost.chisinau.threshold.before") }} 50 MDL
        {{ t("shipping_cost.chisinau.threshold.after") }}!
      </div>
      <div
        class="shipping-cost-free-chisinau"
        :class="{ 'shipping-cost__remaining--available': have_delivery_free }">
        {{ t("shipping_cost.chisinau.free") }} 500lei!
      </div>
    </template>
  </section>
</template>
