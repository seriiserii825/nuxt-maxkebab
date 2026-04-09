<script setup lang="ts">
defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>

<template>
  <ul class="breadcrumb">
    <li v-for="(item, i) in items" :key="item.label" class="breadcrumb__item">
      <NuxtLink v-if="item.to" class="breadcrumb__link" :to="item.to">{{ item.label }}</NuxtLink>
      <span v-else>{{ item.label }}</span>
      <template v-if="i < items.length - 1"> / </template>
    </li>
  </ul>
</template>
