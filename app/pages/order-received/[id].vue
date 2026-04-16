<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const orderId = route.params.id;
</script>

<template>
  <div class="page-order-received">
    <div class="container">
      <div class="order-received">
        <div class="order-received__icon">✓</div>
        <h1 class="order-received__title">{{ t("orderReceived.title") }}</h1>
        <p class="order-received__subtitle">{{ t("orderReceived.subtitle") }}</p>
        <p class="order-received__number">
          {{ t("orderReceived.number") }} <strong>#{{ orderId }}</strong>
        </p>
        <NuxtLink to="/" class="btn order-received__btn">
          {{ t("orderReceived.backToMenu") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
