import { defineStore } from "pinia";
import { ref } from "vue";
import { cities_data } from "~/data/cities";
import type { ICity } from "~/interfaces/ICity";
export const useCityStore = defineStore(
  "city",
  () => {
    const popup_is_active = ref(false);
    const city_index = ref(0);
    const cities = ref<ICity[]>(cities_data);

    const currentCity = computed<ICity | undefined>(() => cities.value[city_index.value]);

    function setCityIndex(index: number) {
      city_index.value = index;
    }

    function setPopupIsActive(isActive: boolean) {
      popup_is_active.value = isActive;
    }
    return {
      cities,
      setCityIndex,
      currentCity,
      popup_is_active,
      setPopupIsActive,
    };
  },
  {
    persist: true,
  },
);
