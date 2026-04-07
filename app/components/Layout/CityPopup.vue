<script setup lang="ts">
import type { ICity } from "~/interfaces/ICity";

const { t } = useI18n();
const city_store = useCityStore();

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const chisinau_selected = ref(false);

const closePopup = () => {
  city_store.setPopupIsActive(false);
  chisinau_selected.value = false;
};

function handleCity(city: ICity["slug"]) {
  if (city === "chisinau") {
    city_store.setCityIndex(0);
    chisinau_selected.value = true;
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
      <h2 class="city-popup__title">{{ t("cityPopup.title") }}</h2>
      <p v-if="!chisinau_selected" class="city-popup__subtitle">
        {{ t("cityPopup.selectLocation") }}
      </p>
      <p v-if="chisinau_selected" class="city-popup__subtitle city-popup__subtitle--second">
        {{ t("cityPopup.deliveryOptions") }}
      </p>
      <div class="city-popup__buttons">
        <button
          v-if="chisinau_selected"
          class="city-popup__button city-popup__button--continue"
          @click="chooseSite">
          {{ t("cityPopup.orderOnSite") }}
        </button>
        <button
          v-if="!chisinau_selected"
          @click="handleCity('chisinau')"
          class="city-popup__button"
          data-city="Chișinău">
          {{ t("cities.chisinau") }}
        </button>
        <button
          v-if="!chisinau_selected"
          @click="handleCity('ialoveni')"
          class="city-popup__button"
          data-city="Ialoveni">
          {{ t("cities.ialoveni") }}
        </button>

        <a
          v-if="chisinau_selected"
          href="https://glovo.go.link/open?adjust_deeplink=glovoapp%3A%2F%2Fopen%3Flink_type%3Dstore%26store_id%3D509901&amp;adjust_t=s321jkn"
          target="_blank"
          rel="noopener noreferrer"
          class="city-popup__button city-popup__button--glovo">
          <IconGlovo />
        </a>
        <a
          v-if="chisinau_selected"
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
