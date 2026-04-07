<script setup lang="ts">
import type { ICatalog } from "~/interfaces/IHomeResponse";

defineProps({
  catalog: {
    type: Object as PropType<ICatalog>,
    required: true,
  },
});
</script>

<template>
  <div class="products-section" :style="{ background: catalog.background }">
    <template v-if="catalog.images && catalog.images.length >= 2">
      <img
        v-for="(image, index) in catalog.images.slice(0, 2)"
        :key="index"
        :class="`rndAnim bg-image bg-image--${index + 1}`"
        :src="image.url"
        alt="pizza"
        loading="lazy" />
    </template>

    <div v-for="child in catalog.children" :key="child.id" class="products-section__child">
      <div class="products-section__inner">
        <div class="container">
          <div class="products-section__header">
            <h2 class="products-section__title">
              <span>{{ child.name }}</span>
              <img v-if="child.image" :src="child.image" :alt="child.name" loading="lazy" />
            </h2>
          </div>

          <div class="products-section__content">
            <ProductCard v-for="product in child.products" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
