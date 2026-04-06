import { defineStore } from "pinia";
import { ref } from "vue";
import { cities_data } from "~/data/cities";
import type { ICity } from "~/interfaces/ICity";
export const useCityStore = defineStore(
  "city",
  () => {
    const city_index = ref(0);
    const cities = ref<ICity[]>(cities_data);

    const currentCity = computed<ICity>(() => cities.value[city_index.value]);

    function setCityIndex(index: number) {
      city_index.value = index;
    }
    return {
      cities,
      setCityIndex,
      currentCity,
    };
  },
  {
    persist: true,
  },
);
