import { defineStore } from "pinia";
import type { CartItem, CartItemOption } from "~/interfaces/ICartItem";

export type { CartItem, CartItemOption };

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<CartItem[]>([]);
    const sidebarOpen = ref(false);

    const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0));

    const total = computed(() =>
      items.value.reduce((sum, item) => {
        const extras =
          (item.additions?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0) +
          (item.sauces?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0);
        return sum + (item.basePrice + extras) * item.qty;
      }, 0),
    );

    const CHISINAU_DELIVERY_THRESHOLD = 300;
    const CHISINAU_DELIVERY_FREE = 500;
    const CHISINAU_DELIVERY_PRICE = 95;
    const CHISINAU_DELIVERY_PRICE_THRESHOLD = 50;

    const threshold_left = computed(() => Math.max(CHISINAU_DELIVERY_THRESHOLD - total.value, 0));

    const have_delivery_base = computed(() => total.value < CHISINAU_DELIVERY_THRESHOLD);

    const have_delivery_threshold = computed(
      () => total.value >= CHISINAU_DELIVERY_THRESHOLD && total.value < CHISINAU_DELIVERY_FREE,
    );
    const have_delivery_free = computed(() => total.value >= CHISINAU_DELIVERY_FREE);

    function increaseQty(uid: string) {
      const item = items.value.find((i) => i.uid === uid);
      if (item) item.qty++;
    }

    function decreaseQty(uid: string) {
      const item = items.value.find((i) => i.uid === uid);
      if (item && item.qty > 1) item.qty--;
    }

    function removeItem(uid: string) {
      const idx = items.value.findIndex((i) => i.uid === uid);
      if (idx !== -1) items.value.splice(idx, 1);
    }

    function addItem(item: CartItem) {
      items.value.push(item);
    }

    function clearCart() {
      items.value = [];
    }

    return {
      items,
      sidebarOpen,
      count,
      total,
      increaseQty,
      decreaseQty,
      removeItem,
      addItem,
      clearCart,
      have_delivery_base,
      have_delivery_threshold,
      have_delivery_free,
      threshold_left,
      CHISINAU_DELIVERY_PRICE,
      CHISINAU_DELIVERY_PRICE_THRESHOLD,
    };
  },
  {
    persist: true,
  },
);
