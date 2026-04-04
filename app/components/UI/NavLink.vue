<script setup lang="ts">
defineProps({
  slug: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <li>
    <NuxtLink :to="$localePath(slug)">{{ label }}</NuxtLink>
  </li>
</template>
