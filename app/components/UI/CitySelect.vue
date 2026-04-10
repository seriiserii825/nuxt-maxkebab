<script setup lang="ts">
const { t } = useI18n();
const cityStore = useCityStore();
const { currentCity, cities, city_was_selected } = storeToRefs(cityStore);

const is_open_dropdown = ref(false);

function handleItemClick(index: number) {
  if (!city_was_selected.value) {
    cityStore.setPopupIsActive(true);
  } else {
    cityStore.setCityIndex(index);
    is_open_dropdown.value = false;
  }
}
</script>

<template>
  <ul class="city-select">
    <li class="city-select__item">
      <div
        class="city-select__title"
        v-if="currentCity"
        @click="is_open_dropdown = !is_open_dropdown">
        <span>{{ t(currentCity.text) }}</span>
        <small>{{ currentCity.address }}</small>
        <IconDown />
      </div>
      <ul class="city-select__list" :class="{ active: is_open_dropdown }" v-if="currentCity">
        <li
          v-for="(city, index) in cities"
          v-show="city.slug !== currentCity.slug"
          :key="city.slug"
          class="city-select__item"
          :data-city-select="city.slug"
          @click="handleItemClick(index)">
          {{ t(city.text) }}
        </li>
      </ul>
    </li>
  </ul>
</template>
