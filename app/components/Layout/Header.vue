<script setup lang="ts">
import type { IMenuItem } from "~/interfaces/IMenuItem";

defineProps({
  menu: {
    type: Array as PropType<IMenuItem[]>,
    required: true,
  },
});

const is_active = ref(false);
const is_cart_open = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      is_active.value = true;
    } else {
      is_active.value = false;
    }
  });
});
</script>

<template>
  <header class="main-header" :class="{'active': is_active}">
    <div class="container main-header__menu">
      <LayoutLanguageSelector />
      <UICitySelect />
      <div class="logo">
        <NuxtLink :to="$localePath('index')">
        <img src="/img/Logo.png" alt="Logo Max Kebab" title="Max Kebab" />
        </NuxtLink>
      </div>
      <UINavMenu :menu="menu" />
      <div class="main-header__cart-icon cart-icon" @click="is_cart_open = true">
        <div class="cart-icon-target">
          <svg
              width="44"
              height="41"
              viewBox="0 0 44 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
            <path
                d="M42.4943 12.375L39.9943 39.875H4.00568L1.50568 12.375H42.4943Z"
                stroke="white"></path>
            <path
                d="M13.75 11C13.75 10.5407 13.75 9.7187 13.75 8.8C13.75 3.93989 17.4437 0 22 0C26.5563 0 30.25 3.93989 30.25 8.8C30.25 9.7471 30.25 10.5264 30.25 11"
                stroke="white"></path>
          </svg>
          <span class="cart-contents" title="Coș">
            <span class="amount"><span class="count">3</span></span>
          </span>
        </div>
        <div class="main-header__cart-icon__total">
          257 Lei
        </div>
      </div>
      <UIMiniCart :is-open="is_cart_open" @close="is_cart_open = false" />

      <!-- TODO: change sandwitch -->
      <div class="main-header__sandwich sandwitch-wrap" id="js-sandwitch-wrap">
        <div class="sandwitch">
          <div class="sandwitch__line sandwitch__line--top"></div>
          <div class="sandwitch__line sandwitch__line--middle"></div>
          <div class="sandwitch__line sandwitch__line--bottom"></div>
        </div>
      </div>
    </div>
  </header>
</template>
