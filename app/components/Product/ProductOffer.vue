<script setup lang="ts">
  import type { IProduct } from "~/interfaces/IHomeResponse";

  const { locale } = useI18n();

  function productPath(permalink: string) {
    const prefix = locale.value !== "ro" ? `/${locale.value}` : "";
    return `${prefix}/${permalink}`;
  }

  defineProps({
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  });
</script>

<template>
  <div class="product-offer">
    <NuxtLink :to="productPath(product.permalink)" class="product-offer__thumb">
      <img v-if="product.image" :src="product.image" :alt="product.title" loading="lazy" />
    </NuxtLink>

    <div class="product-offer__info">
      <div class="product-offer__title">
        {{ product.title }}
        <div class="product-offer__btn-add">
          <NuxtLink :to="productPath(product.permalink)">+</NuxtLink>
        </div>
      </div>

      <div class="product-offer__footer">
        <div class="product-offer__prices">
          <div v-if="product.is_on_sale" class="sale">
            {{ product.sale_price }}
            <span>Lei</span>
          </div>
          <div :class="['regular', { hidden: product.is_on_sale }]">
            {{ product.regular_price }}
            <span>Lei</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-offer {
    background: #fff;
    border-radius: 3rem;
    box-shadow: 0 4px 60px -20px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.02);
    }

    &__thumb {
      display: block;

      img {
        width: 100%;
        height: 35rem;
        border-radius: 3rem;
        object-fit: cover;
      }
    }

    &__info {
      padding: 2.8rem 3.2rem;

      @media screen and (max-width: 400px) {
        padding: 2rem;
      }
    }

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 2rem;
      margin-bottom: 2rem;
      font-weight: 700;
      font-size: 3.5rem;
      line-height: 4.2rem;
      color: #000;

      @media screen and (max-width: 400px) {
        gap: 0;
        font-size: 2.8rem;
        line-height: 3.5rem;
      }
    }

    &__btn-add {
      flex-shrink: 0;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5rem;
        height: 5rem;
        font-size: 5rem;
        line-height: 5.2rem;
        color: #fff;
        background: #8d1e14;
        border-radius: 50%;
        text-decoration: none;
      }
    }

    &__footer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__prices {
      display: flex;
      font-weight: 700;
      font-size: 3.5rem;
      line-height: 4.1rem;
      letter-spacing: -0.025em;

      .sale {
        color: #120d0d;
        margin-right: 2rem;

        span {
          font-size: 3rem;
          color: var(--color-red);
        }
      }

      .regular {
        color: #000;
        opacity: 0.1;

        &.hidden {
          display: none;
        }

        span {
          font-size: 3rem;
        }
      }
    }

    &__add-to-cart {
      font-weight: 300;
      font-size: 2rem;
      line-height: 2.3rem;
      text-transform: lowercase;
      color: #000;
    }
  }
</style>
