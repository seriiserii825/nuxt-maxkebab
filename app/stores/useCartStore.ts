import { defineStore } from "pinia";

export interface CartItemOption {
  label: string;
  value: string;
  price?: number;
}

export interface CartItem {
  id: number;
  title: string;
  image: string;
  basePrice: number;
  qty: number;
  options?: { label: string; value: string }[];
  additions?: CartItemOption[];
  sauces?: CartItemOption[];
  comment?: string;
}

const dummyItems: CartItem[] = [
  {
    id: 1,
    title: "Max Kebab Classic",
    image: "/img/products/kebab-1.jpg",
    basePrice: 89,
    qty: 2,
    options: [
      { label: "Bautura", value: "Coca-Cola" },
      { label: "Sos", value: "Ketchup" },
    ],
    additions: [
      { label: "Carne", value: "Carne", price: 15 },
      { label: "Cascaval", value: "Cascaval", price: 20 },
    ],
    sauces: [{ label: "Sos picant", value: "Sos picant", price: 10 }],
    comment: "Fără ceapă, vă rog",
  },
  {
    id: 2,
    title: "Kebab Poulet",
    image: "/img/products/kebab-2.jpg",
    basePrice: 79,
    qty: 1,
    options: [
      { label: "Bautura", value: "Sprite" },
      { label: "Sos", value: "Maioneza cu usturoi" },
    ],
    sauces: [
      { label: "Ketchup", value: "Ketchup", price: 12 },
      { label: "Mustar", value: "Mustar", price: 10 },
    ],
  },
  {
    id: 3,
    title: "Durum Mix",
    image: "/img/products/kebab-3.jpg",
    basePrice: 95,
    qty: 1,
    options: [{ label: "Sos", value: "Ketchup" }],
    additions: [{ label: "Lavas", value: "Lavas", price: 5 }],
  },
];

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<CartItem[]>(dummyItems);

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
