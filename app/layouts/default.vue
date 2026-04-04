<script setup lang="ts">
const { data: menu, error } = await useFetch("/api/menu");
if (error.value) {
  showError({
    statusCode: error.value.statusCode ?? 500,
    message: error.value.data?.message ?? error.value.message,
  });
}
</script>

<template>
  <div class="default-layout">
    <LayoutHeader :menu="menu" />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
