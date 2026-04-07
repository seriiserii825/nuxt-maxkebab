<script setup lang="ts">
import type { ICatalog } from "~/interfaces/IHomeResponse";

defineProps({
  catalog: {
    type: Object as PropType<ICatalog>,
    required: true,
  },
  gradients: {
    type: Object as PropType<IGradientsBg>,
    required: true,
  },
});
</script>

<template>
  <div class="products-section" :style="{ background: bg }">
    <img class="rndAnim bg-image bg-image--1" src="" alt="pizza" loading="lazy" />
    <img class="rndAnim bg-image bg-image--2" src="" alt="pizza" loading="lazy" />

    <div
      v-for="(child, index) in catalog.children"
      :key="child.id"
      :style="{ background: gradients.gradients[index] }"
      class="products-section__child">
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
