<script setup lang="ts">
import { useCartStore } from "~/stores/useCartStore";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const cart = useCartStore();
</script>

<template>
  <Transition name="mini-cart">
    <div v-if="isOpen" class="mini-cart">
      <div class="mini-cart__overlay" @click="emit('close')" />
      <div class="mini-cart__panel">

        <div class="mini-cart__header">
          <span class="mini-cart__title">Coș ({{ cart.count }})</span>
          <button class="mini-cart__close" aria-label="Close cart" @click="emit('close')">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <p v-if="!cart.items.length" class="mini-cart__empty">
          Nu ai niciun produs în coș.
        </p>

        <ul v-else class="mini-cart__list">
          <li v-for="item in cart.items" :key="item.id" class="mini-cart__item">
            <div class="mini-cart__item-img">
              <img :src="item.image" :alt="item.title" />
            </div>

            <div class="mini-cart__item-body">
              <div class="mini-cart__item-top">
                <span class="mini-cart__item-title">{{ item.title }}</span>
                <button class="mini-cart__item-remove" aria-label="Remove" @click="cart.removeItem(item.id)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
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
                <div class="mini-cart__item-qty-ctrl">
                  <button class="mini-cart__qty-btn" aria-label="Decrease" @click="cart.decreaseQty(item.id)">−</button>
                  <span class="mini-cart__qty-val">{{ item.qty }}</span>
                  <button class="mini-cart__qty-btn" aria-label="Increase" @click="cart.increaseQty(item.id)">+</button>
                </div>
                <span class="mini-cart__item-total">
                  {{ (item.basePrice + (item.additions?.reduce((s,a) => s+(a.price??0),0)??0) + (item.sauces?.reduce((s,a) => s+(a.price??0),0)??0)) * item.qty }} Lei
                </span>
              </div>
            </div>
          </li>
        </ul>

        <div v-if="cart.items.length" class="mini-cart__footer">
          <div class="mini-cart__total">
            <span>Total:</span>
            <strong>{{ cart.total }} Lei</strong>
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
