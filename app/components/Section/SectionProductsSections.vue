<script setup lang="ts">
import type { ICatalog } from "~/interfaces/IHomeResponse";

defineProps<{
  catalog: ICatalog[];
}>();

const gradients_bg: IGradientsBg[] = [
  {
    gradients: [
      "linear-gradient(180deg,#fffef1 80.21%,#f1fff5 100%)",
      "linear-gradient(180deg,#f1fff5 76.56%,#fcf9f4 100%)",
      "#fcf9f4",
      "linear-gradient(180deg,#fcf9f4 0%,#d9edff 100%)",
      "linear-gradient(180deg,#d9edff 33%,#f1fff5 100%)",
      "linear-gradient(180deg,#f1fff5 76.56%,#fcf9f4 100%)",
    ],
  },
  {
    gradients: [
      "linear-gradient(180deg,#fffef1 80.21%,#f1fff5 100%)",
      "linear-gradient(180deg,#f1fff5 76.56%,#fcf9f4 100%)",
      "#fcf9f4",
    ],
  },
  {
    gradients: ["linear-gradient(180deg,#fffef1 80.21%,#f1fff5 100%)"],
  },
];
</script>

<template>
  <SectionProductsSection
    v-for="(ctg, index) in catalog"
    :key="ctg.id"
    :catalog="ctg"
    :gradients="gradients_bg[index] || { gradients: [] }" />
</template>
