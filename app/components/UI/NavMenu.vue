<script setup lang="ts">
import type { IMenuItem } from "~/interfaces/IMenuItem";

const { t } = useI18n();

const props = defineProps({
  menu: {
    type: Array as PropType<IMenuItem[]>,
    required: true,
  },
});
</script>

<template>
  <ul class="main-menu main-header__main-menu">
    <li v-for="item in menu" :key="item.href" :class="item.sub_menu ? 'menu-menu' : ''">
      <template v-if="item.sub_menu">
        <h3 class="menu-menu__title">{{ t(item.text) }}</h3>
        <ul class="sub-menu">
          <li v-for="sub in item.sub_menu" :key="sub.href">
            <NuxtLink :href="`${$localePath('index')}${sub.href}`">{{ t(sub.text) }}</NuxtLink>
          </li>
        </ul>
      </template>
      <a v-else :href="$localePath(item.href)">{{ t(item.text) }}</a>
    </li>
  </ul>
</template>
