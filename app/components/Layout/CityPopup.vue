<script setup lang="ts">
const city_store = useCityStore();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const closePopup = () => {
  city_store.setPopupIsActive(false);
};
</script>

<template>
  <div class="city-popup" :class="{ active: active }">
    <div class="city-popup__overlay" @click="closePopup"></div>
    <div class="city-popup__content">
      <button class="city-popup__close" @click="closePopup">×</button>
      <h2 class="city-popup__title">Alege cum să comanzi</h2>
      <p class="city-popup__subtitle">Selectați localul</p>
      <p class="hidden city-popup__subtitle city-popup__subtitle--second">
        Preferi Glovo, Straus sau comanda pe site?
      </p>
      <div class="city-popup__buttons">
        <button class="hidden city-popup__button city-popup__button--continue">
          Comanda pe site
        </button>
        <button class="city-popup__button" data-city="Chișinău">Chișinău</button>
        <button class="city-popup__button" data-city="Ialoveni">Ialoveni</button>

        <a
          href="https://glovo.go.link/open?adjust_deeplink=glovoapp%3A%2F%2Fopen%3Flink_type%3Dstore%26store_id%3D509901&amp;adjust_t=s321jkn"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden city-popup__button city-popup__button--glovo">
          <IconGlovo />
        </a>
        <a
          href="https://straus.md/restaurant/max-kebab"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden city-popup__button city-popup__button--straus">
          <IconStrauss />
        </a>
      </div>
    </div>
  </div>
</template>
