<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  width: number
  height: number
}>()
</script>

<template>
  <div class="single-product__gallery">
    <img class="single-product__image" :src="src" :alt="alt" :width="width" :height="height" />
  </div>
</template>

<style scoped lang="scss">
.single-product {
  &__gallery {
    display: inline-block;
    width: 50%;

    @media (max-width: 992px) {
      margin: 0 auto;
      width: 100%;
    }
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
</style>
