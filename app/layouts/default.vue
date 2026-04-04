<script setup lang="ts">
const [{ data: menu, error: menuErrors }] = await Promise.all([useFetch("/api/menu")]);
watch(menu, (newMenu) => {
  if (newMenu) {
    console.log(newMenu, "newMenu");
  }
});
</script>

<template>
  <div class="default-layout">
    <LayoutHeader />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
