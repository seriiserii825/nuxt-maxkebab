<script setup lang="ts">
defineProps<{
  title: string
  description: string
  price: number
  currency?: string
}>()
</script>

<template>
  <div>
    <h1 class="single-product__title">{{ title }}</h1>

    <div class="single-product__description">
      <p><strong>{{ description }}</strong></p>
    </div>

    <div class="single-product__price">
      <span class="single-product__price-value">{{ price }}</span>
      <span class="single-product__price-currency">{{ currency ?? 'Lei' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-product {
  &__title {
    margin-top: -6px;
    margin-bottom: 5rem;
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 4.2rem;
    color: #000;

    @media (max-width: 576px) {
      margin-bottom: 2rem;
      font-size: 2.8rem;
    }
  }

  &__description {
    margin-bottom: 2rem;
    width: 70%;

    @media (max-width: 576px) {
      width: 100%;
    }

    p {
      font-size: 2rem;
      font-weight: 300;
      line-height: 2.3rem;
      color: #000;
    }
  }

  &__price {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    font-size: 4rem;
    font-weight: 700;
    line-height: 4.7rem;
    letter-spacing: -0.025em;
    color: #120d0d;
  }

  &__price-currency {
    font-size: 2rem;
    color: var(--color-red);
  }
}
</style>
