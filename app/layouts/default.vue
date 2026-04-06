<script setup lang="ts">
import { menu } from "~/data/menu";

const city_store = useCityStore();
const { popup_is_active } = storeToRefs(city_store);
</script>

<template>
  <div class="default-layout">
    <LayoutHeader v-if="menu" :menu="menu" />
    <slot />
    <LayoutCityPopup v-if="popup_is_active" :active="popup_is_active" />
    <!-- <AppFooter /> -->
  </div>
</template>
