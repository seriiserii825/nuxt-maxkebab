<script setup lang="ts">
import type { ICatalog, ICatalogChild, IProduct } from "~/interfaces/IHomeResponse";

const props = defineProps<{
  catalog: ICatalog[];
}>();
</script>

<template>
  <div v-for="category in catalog" :key="category.id" class="products-section">
    <img class="rndAnim bg-image bg-image--1" src="" alt="pizza" loading="lazy" />
    <img class="rndAnim bg-image bg-image--2" src="" alt="pizza" loading="lazy" />

    <div class="products-section__inner">
      <div class="container">
        <div v-for="child in category.children" :key="child.id">
          <div class="products-section__header">
            <h2 class="products-section__title">
              <span>{{ child.name }}</span>
              <img v-if="child.image" :src="child.image" :alt="child.name" loading="lazy" />
            </h2>
          </div>

          <div class="products-section__content">
            <div v-for="product in child.products" :key="product.id" class="product-card">
              <a :href="product.permalink">
                <div class="product-card__img">
                  <img
                    v-if="product.image"
                    :src="product.image"
                    :alt="product.title"
                    loading="lazy" />
                </div>
              </a>

              <div class="product-card__content">
                <h3 class="product-card__title">{{ product.title }}</h3>

                <div class="product-card__description" v-html="product.description" />

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
                    <a :href="product.permalink" class="product-card__add-to-cart">
                      <IconTopping />
                    </a>

                    <a
                      v-if="product.has_options"
                      class="product-card__topping"
                      :href="product.permalink">
                      Topping
                    </a>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
