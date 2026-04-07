<script setup lang="ts">
import type { ICatalog } from "~/interfaces/IHomeResponse";


defineProps<{
  catalog: ICatalog[];
}>();
</script>

<template>
  <SectionProductsSection v-for="ctg in catalog" :key="ctg.id" :catalog="ctg" />
</template>
