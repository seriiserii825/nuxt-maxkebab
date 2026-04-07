<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

interface CartItemOption {
  label: string;
  value: string;
  price?: number;
}

interface CartItem {
  id: number;
  title: string;
  image: string;
  basePrice: number;
  qty: number;
  options?: {
    label: string;
    value: string;
  }[];
  additions?: CartItemOption[];
  sauces?: CartItemOption[];
  comment?: string;
}

const cartItems: CartItem[] = [
  {
    id: 1,
    title: 'Max Kebab Classic',
    image: '/img/products/kebab-1.jpg',
    basePrice: 89,
    qty: 2,
    options: [
      { label: 'Bautura', value: 'Coca-Cola' },
      { label: 'Sos', value: 'Ketchup' },
    ],
    additions: [
      { label: 'Carne', value: 'Carne', price: 15 },
      { label: 'Cascaval', value: 'Cascaval', price: 20 },
    ],
    sauces: [
      { label: 'Sos picant', value: 'Sos picant', price: 10 },
    ],
    comment: 'Fără ceapă, vă rog',
  },
  {
    id: 2,
    title: 'Kebab Poulet',
    image: '/img/products/kebab-2.jpg',
    basePrice: 79,
    qty: 1,
    options: [
      { label: 'Bautura', value: 'Sprite' },
      { label: 'Sos', value: 'Maioneza cu usturoi' },
    ],
    sauces: [
      { label: 'Ketchup', value: 'Ketchup', price: 12 },
      { label: 'Mustar', value: 'Mustar', price: 10 },
    ],
  },
  {
    id: 3,
    title: 'Durum Mix',
    image: '/img/products/kebab-3.jpg',
    basePrice: 95,
    qty: 1,
    options: [
      { label: 'Sos', value: 'Ketchup' },
    ],
    additions: [
      { label: 'Lavas', value: 'Lavas', price: 5 },
    ],
  },
];

function itemExtrasPrice(item: CartItem): number {
  const additionsTotal = item.additions?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0;
  const saucesTotal = item.sauces?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0;
  return additionsTotal + saucesTotal;
}

function itemTotal(item: CartItem): number {
  return (item.basePrice + itemExtrasPrice(item)) * item.qty;
}

const total = computed(() =>
  cartItems.reduce((sum, item) => sum + itemTotal(item), 0)
);
</script>

<template>
  <Transition name="mini-cart">
    <div v-if="isOpen" class="mini-cart">
      <div class="mini-cart__overlay" @click="emit('close')" />
      <div class="mini-cart__panel">
        <div class="mini-cart__header">
          <span class="mini-cart__title">Coș ({{ cartItems.length }})</span>
          <button class="mini-cart__close" @click="emit('close')" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <ul class="mini-cart__list">
          <li v-for="item in cartItems" :key="item.id" class="mini-cart__item">
            <div class="mini-cart__item-img">
              <img :src="item.image" :alt="item.title" />
            </div>

            <div class="mini-cart__item-body">
              <div class="mini-cart__item-top">
                <span class="mini-cart__item-title">{{ item.title }}</span>
                <button class="mini-cart__item-remove" aria-label="Remove">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>

              <!-- Radio options: Bautura, Sos -->
              <ul v-if="item.options?.length" class="mini-cart__item-opts">
                <li v-for="opt in item.options" :key="opt.label">
                  <span class="mini-cart__item-opts-label">{{ opt.label }}:</span>
                  {{ opt.value }}
                </li>
              </ul>

              <!-- Additions with price -->
              <ul v-if="item.additions?.length" class="mini-cart__item-opts mini-cart__item-opts--additions">
                <li v-for="add in item.additions" :key="add.label">
                  + {{ add.label }}
                  <span class="mini-cart__item-opts-price">+{{ add.price }} Lei</span>
                </li>
              </ul>

              <!-- Sauce counters -->
              <ul v-if="item.sauces?.length" class="mini-cart__item-opts mini-cart__item-opts--sauces">
                <li v-for="sauce in item.sauces" :key="sauce.label">
                  {{ sauce.label }}
                  <span class="mini-cart__item-opts-price">+{{ sauce.price }} Lei</span>
                </li>
              </ul>

              <!-- Comment -->
              <p v-if="item.comment" class="mini-cart__item-comment">
                "{{ item.comment }}"
              </p>

              <div class="mini-cart__item-bottom">
                <span class="mini-cart__item-qty">{{ item.qty }} x {{ item.basePrice }} Lei</span>
                <span class="mini-cart__item-total">{{ itemTotal(item) }} Lei</span>
              </div>
            </div>
          </li>
        </ul>

        <div class="mini-cart__footer">
          <div class="mini-cart__total">
            <span>Total:</span>
            <strong>{{ total }} Lei</strong>
          </div>
          <div class="mini-cart__actions">
            <NuxtLink to="/cart" class="mini-cart__btn mini-cart__btn--secondary" @click="emit('close')">
              Coș
            </NuxtLink>
            <NuxtLink to="/checkout" class="mini-cart__btn mini-cart__btn--primary" @click="emit('close')">
              Comandă
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
