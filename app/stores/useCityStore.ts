import { defineStore } from "pinia";
import { ref } from "vue";
import { cities_data } from "~/data/cities";
import type { ICity } from "~/interfaces/ICity";
export const useCityStore = defineStore(
  "city",
  () => {
    const city_was_selected = ref(false);
    const popup_is_active = ref(false);
    const popup_delivery_step = ref(false);
    const city_index = ref(0);
    const cities = ref<ICity[]>(cities_data);

    const currentCity = computed<ICity | undefined>(() => cities.value[city_index.value]);

    function setCityIndex(index: number) {
      city_index.value = index;
    }

    function setPopupIsActive(isActive: boolean) {
      popup_is_active.value = isActive;
      if (!isActive) popup_delivery_step.value = false;
    }

    function setPopupDeliveryStep(value: boolean) {
      popup_delivery_step.value = value;
    }

    function setCityWasSelected(wasSelected: boolean) {
      city_was_selected.value = wasSelected;
    }
    return {
      cities,
      city_index,
      setCityIndex,
      currentCity,
      popup_is_active,
      setPopupIsActive,
      popup_delivery_step,
      setPopupDeliveryStep,
      city_was_selected,
      setCityWasSelected,
    };
  },
  {
    persist: true,
  },
);
