<script setup lang="ts">
import { menu } from "~/data/menu";
</script>

<template>
  <div class="default-layout">
    <LayoutHeader v-if="menu" :menu="menu" />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
