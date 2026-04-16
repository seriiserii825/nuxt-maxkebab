<script setup lang="ts">
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);
</script>

<template>
  <div class="checkout-city">
    <button
      v-for="(city, index) in cityStore.cities"
      :key="city.slug"
      type="button"
      class="checkout-city__item"
      :class="{ active: currentCity?.slug === city.slug }"
      @click="cityStore.setCityIndex(index)"
    >
      {{ $t(city.text) }}
    </button>
  </div>
</template>
