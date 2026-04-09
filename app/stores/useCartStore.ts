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

    function increaseQty(id: number) {
      const item = items.value.find((i) => i.id === id);
      if (item) item.qty++;
    }

    function decreaseQty(id: number) {
      const item = items.value.find((i) => i.id === id);
      if (item && item.qty > 1) item.qty--;
    }

    function removeItem(id: number) {
      const idx = items.value.findIndex((i) => i.id === id);
      if (idx !== -1) items.value.splice(idx, 1);
    }

    function addItem(item: CartItem) {
      const existing = items.value.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += item.qty;
        existing.options = item.options;
        existing.additions = item.additions;
        existing.sauces = item.sauces;
        existing.comment = item.comment;
      } else {
        items.value.push(item);
      }
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
