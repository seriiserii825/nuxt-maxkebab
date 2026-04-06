<script setup lang="ts">
import type { ICity } from "~/interfaces/ICity";

const city_store = useCityStore();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const current_index = ref<null | number>(null);

const closePopup = () => {
  city_store.setPopupIsActive(false);
};

function handleCity(city: ICity["slug"]) {
  if (city === "chisinau") {
    current_index.value = 0;
    city_store.setCityIndex(0);
  } else {
    city_store.setCityIndex(1);
    closePopup();
    city_store.setCityWasSelected(true);
  }
}
function chooseSite() {
  city_store.setCityWasSelected(true);
  closePopup();
}
</script>

<template>
  <div class="city-popup" :class="{ active: active }">
    <div class="city-popup__overlay" @click="closePopup"></div>
    <div class="city-popup__content">
      <button class="city-popup__close" @click="closePopup">×</button>
      <h2 class="city-popup__title">Alege cum să comanzi</h2>
      <p v-if="current_index !== null" class="city-popup__subtitle">Selectați localul</p>
      <p v-if="current_index === 0" class="city-popup__subtitle city-popup__subtitle--second">
        Preferi Glovo, Straus sau comanda pe site?
      </p>
      <div class="city-popup__buttons">
        <button
          v-if="current_index === 0"
          class="city-popup__button city-popup__button--continue"
          @click="chooseSite">
          Comanda pe site
        </button>
        <button
          v-if="current_index === null"
          @click="handleCity('chisinau')"
          class="city-popup__button"
          data-city="Chișinău">
          Chișinău
        </button>
        <button
          v-if="current_index === null"
          @click="handleCity('ialoveni')"
          class="city-popup__button"
          data-city="Ialoveni">
          Ialoveni
        </button>

        <a
          v-if="current_index === 0"
          href="https://glovo.go.link/open?adjust_deeplink=glovoapp%3A%2F%2Fopen%3Flink_type%3Dstore%26store_id%3D509901&amp;adjust_t=s321jkn"
          target="_blank"
          rel="noopener noreferrer"
          class="city-popup__button city-popup__button--glovo">
          <IconGlovo />
        </a>
        <a
          v-if="current_index === 0"
          href="https://straus.md/restaurant/max-kebab"
          target="_blank"
          rel="noopener noreferrer"
          class="city-popup__button city-popup__button--straus">
          <IconStrauss />
        </a>
      </div>
    </div>
  </div>
</template>
