import { defineStore } from "pinia";

export type ShippingMethod = "delivery" | "pickup";

export const useShippingStore = defineStore(
  "shipping",
  () => {
    const method = ref<ShippingMethod>("pickup");

    function setMethod(m: ShippingMethod) {
      method.value = m;
    }

    function reset() {
      method.value = "pickup";
    }

    return { method, setMethod, reset };
  },
  { persist: true },
);
