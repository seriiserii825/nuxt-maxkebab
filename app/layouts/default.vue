<script setup lang="ts">
const { data: menu, error } = await useFetch("/api/menu");
if (error.value) showError(error.value);
</script>

<template>
  <div class="default-layout">
    <LayoutHeader :menu="menu" />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
