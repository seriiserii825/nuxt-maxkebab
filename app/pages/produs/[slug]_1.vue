<script setup lang="ts">
import type { IWooProduct } from "~/interface/IWooProduct";
import type { IProductsResponse } from "~/interface/ProductsResponse";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: product, error } = await useFetch<IWooProduct>("/api/product", {
  query: { slug },
});

const categoryId = computed(() => product.value?.categories?.[0]?.id);

const { data: products } = await useFetch<IProductsResponse>("/api/products", {
  query: { category_id: categoryId, per_page: 4, exclude: product.value?.id },
});
</script>

<template>
  <div class="single-product" v-if="product">
    <!-- <PrettyPrint v-if="product" :data="product" title="Product data" /> -->
    <div class="container mx-auto py-12 px-4 lg:px-8">
      <!-- Breadcrumb -->
      <ProductBreadcrumbs :product="product" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <!-- ===== Product layout ===== -->
        <ProductGallery :product="product" />

        <!-- RIGHT — Details -->
        <ProductDetails :product="product" />
      </div>
      <!-- ===== Related products ===== -->
      <ProductRelatedProducts v-if="products" :products-response="products" />
    </div>
  </div>
  <UIErrorMessage
    v-else-if="error"
    :error-message="error.message ?? 'Failed to load product page data'" />
</template>
