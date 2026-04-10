import { defineStore } from "pinia";
import type { CartItem, CartItemOption } from "~/interfaces/ICartItem";

export type { CartItem, CartItemOption };

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<CartItem[]>([]);

    const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0));

    const total = computed(() =>
      items.value.reduce((sum, item) => {
        const extras =
          (item.additions?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0) +
          (item.sauces?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0);
        return sum + (item.basePrice + extras) * item.qty;
      }, 0),
    );

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

    return { items, count, total, increaseQty, decreaseQty, removeItem, addItem, clearCart };
  },
  {
    persist: true,
  },
);
