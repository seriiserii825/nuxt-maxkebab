<script setup lang="ts">
import type { IMenuCategory } from "~/interfaces/IMenuCategory";

const props = defineProps({
  menu: {
    type: Array as PropType<IMenuCategory[]>,
    required: true,
  },
});
</script>

<template>
  <ul class="main-menu main-header__main-menu">
    <li class="menu-menu">
      <h3 class="menu-menu__title">Menu</h3>
      <ul class="sub-menu">
        <li>
          <a v-for="item in menu" :key="item.slug" :href="`${$localePath('index')}/#${item.slug}`">
            <div>{{ item.name }}</div>
          </a>
        </li>
      </ul>
    </li>
    <UINavLink slug="oferte" label="Oferte" />
    <UINavLink slug="despre-noi" label="Despre noi" />
    <UINavLink slug="livrare" label="Livrare" />
    <UINavLink slug="contacte" label="Contacte" />
  </ul>
</template>
