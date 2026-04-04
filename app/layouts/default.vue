<script setup lang="ts">
const [{ data: menu, status, error }] = await Promise.all([useFetch("/api/menu")]);
</script>

<template>
  <div class="default-layout">
    <LayoutHeader :menu="menu" v-if="menu" />
    <UIErrorMessage
      v-else-if="status === 'error'"
      :error-message="error?.message ?? 'Failed to load menu'" />
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
