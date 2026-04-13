<script setup lang="ts">
  import LayoutFooter from "~/components/Layout/LayoutFooter.vue";
  import ShippingCost from "~/components/ShippingCost.vue";
  import { menu } from "~/data/menu";
  const { notify } = useNotification();
  onMounted(() => {
    notify({
      type: "success",
      title: "Title",
      text: "Hello notify!",
    });
  });
  const city_store = useCityStore();
  const { popup_is_active, city_was_selected } = storeToRefs(city_store);

  if (!city_was_selected.value) {
    city_store.setPopupIsActive(true);
  }
</script>

<template>
  <div class="default-layout">
    <LayoutHeader v-if="menu" :menu="menu" />
    <slot />
    <LayoutCityPopup v-if="popup_is_active" :active="popup_is_active" />
    <LayoutFooter />
    <ShippingCost />
  </div>
</template>
