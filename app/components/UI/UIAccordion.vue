<script setup lang="ts">
  import type { IDeliveryItem } from "~/interfaces/IDeliveryResponse";

  defineProps({
    items: {
      type: Array as PropType<IDeliveryItem[]>,
      required: true,
    },
  });

  const city_store = useCityStore();
  const { currentCity } = storeToRefs(city_store);

  const openItems = ref<Set<number>>(new Set([0]));

  function toggle(i: number) {
    if (openItems.value.has(i)) {
      openItems.value.delete(i);
    } else {
      openItems.value.add(i);
    }
    openItems.value = new Set(openItems.value);
  }

  function cityContent(item: IDeliveryItem): string {
    return currentCity.value?.slug === "ialoveni" ? item.description_Ialoveni : item.description;
  }
</script>

<template>
  <div class="accordion">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="accordion__item"
      :class="{ active: openItems.has(i) }">
      <h2 class="accordion__header" @click="toggle(i)">
        {{ item.title }}
        <div class="btn-toggle"></div>
      </h2>
      <div class="accordion__content" v-html="cityContent(item)" />
    </div>
  </div>
</template>
