<script setup lang="ts">
import SectionProductsSection from "~/components/Section/SectionProductsSection.vue";
import type { IHomeResponse } from "~/interfaces/IHomeResponse";

const { locale } = useI18n();
const { data: home, error } = await useFetch<IHomeResponse>("/api/home", {
  query: { lang: locale },
  watch: [locale],
});
if (error.value) {
  showError({
    statusCode: error.value.statusCode ?? 500,
    message: error.value.data?.message ?? error.value.message,
  });
}
</script>

<template>
  <div class="index">
    <!-- <UIPrettyPrint v-if="home" :data="home" /> -->
    <UISlider
      v-if="home && home.slider && home.slider.gallery"
      :slides="home.slider.gallery"
      :speed="1000"
      :delay="4000">
      <template #default="{ slide }">
        <img :src="slide" alt="slider" />
      </template>
    </UISlider>
    <SectionProductsSection />
  </div>
</template>
