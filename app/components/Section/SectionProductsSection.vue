<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import type { ICatalog } from "~/interfaces/IHomeResponse";

defineProps({
  catalog: {
    type: Object as PropType<ICatalog>,
    required: true,
  },
});

const rndAnimEls = ref<HTMLElement[]>([]);
const tweens: gsap.core.Tween[] = [];

function tweenProperty(target: HTMLElement, prop: string, min: number, max: number) {
  const tween = gsap.to(target, {
    [prop]: gsap.utils.random(min, max),
    duration: gsap.utils.random(3, 6),
    ease: "none",
    onComplete: tweenProperty,
    onCompleteParams: [target, prop, min, max],
  });
  tweens.push(tween);
}

function playEl(el: HTMLElement) {
  const playField = 50;
  const dx = playField * 0.4;
  const dy = playField * 0.5;

  tweenProperty(el, "scale", 0.9, 0.9);
  tweenProperty(el, "x", -dx, dx);
  tweenProperty(el, "y", -dy, dy);
}

onMounted(() => {
  rndAnimEls.value.forEach(playEl);
});

onUnmounted(() => {
  tweens.forEach((t) => t.kill());
});
</script>

<template>
  <div class="products-section" :style="{ background: catalog.background }">
    <template v-if="catalog.images && catalog.images.length >= 2">
      <img
        v-for="(image, index) in catalog.images.slice(0, 2)"
        :key="index"
        :ref="(el) => { if (el) rndAnimEls.push(el as HTMLElement) }"
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
