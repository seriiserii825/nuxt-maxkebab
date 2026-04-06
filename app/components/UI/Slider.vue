<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

defineProps<{
  slides: string[];
  speed?: number;
  delay?: number;
}>();

const modules = [Autoplay];
</script>

<template>
  <Swiper
    :modules="modules"
    :slides-per-view="1"
    :speed="speed ?? 600"
    :autoplay="{ delay: delay ?? 3000 }"
    loop>
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <slot :slide="slide" :index="index" />
    </SwiperSlide>
  </Swiper>
</template>
