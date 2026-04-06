<script setup lang="ts">
import type { ICity } from "~/interfaces/ICity";

const { t } = useI18n();
const cityStore = useCityStore();
const { currentCity, cities } = storeToRefs(cityStore);

const is_open_dropdown = ref(false);

function handleItemClick(index: number, slug: ICity["slug"]) {
  cityStore.setCityIndex(index);
  is_open_dropdown.value = false;
  if (slug === "chisinau") {
    cityStore.setPopupIsActive(true);
  }
}
</script>

<template>
  <ul class="city-select">
    <li class="city-select__item">
      <div class="city-select__title" @click="is_open_dropdown = !is_open_dropdown">
        <span>{{ t(currentCity.text) }}</span>
        <small>{{ currentCity.address }}</small>
        <IconDown />
      </div>
      <ul class="city-select__list" :class="{ active: is_open_dropdown }">
        <li
          v-for="(city, index) in cities"
          v-show="city.slug !== currentCity.slug"
          :key="city.slug"
          class="city-select__item"
          :data-city-select="city.slug"
          @click="handleItemClick(index, city.slug)">
          {{ t(city.text) }}
        </li>
      </ul>
    </li>
  </ul>
</template>
