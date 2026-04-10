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
  <div class="product-card">
    <NuxtLink :to="productPath(product.permalink)" class="product-card__img">
      <img v-if="product.image" :src="product.image" :alt="product.title" loading="lazy" />
    </NuxtLink>

    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>

      <div class="product-card__description" v-html="product.description"></div>
      <footer class="product-card__footer">
        <div class="product-card__price">
          <span v-if="product.is_on_sale" class="product-card__price--old">
            {{ product.regular_price }} Lei
          </span>
          <span>
            {{ product.is_on_sale ? product.sale_price : product.regular_price }}
          </span>
          <span>Lei</span>
        </div>

        <div class="product-card__actions">
          <NuxtLink :to="productPath(product.permalink)" class="product-card__add-to-cart">
            <IconTopping />
          </NuxtLink>

          <NuxtLink
            v-if="product.has_options"
            class="product-card__topping"
            :to="productPath(product.permalink)">
            Topping
          </NuxtLink>
        </div>
      </footer>
    </div>
  </div>
</template>
