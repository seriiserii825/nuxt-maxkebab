<script setup lang="ts">
  import type { IWooProduct } from "~/interfaces/IWooProduct";
  import { useSingleProductStore } from "~/stores/useSingleProductStore";

  import { bautura, sos, adaosuri, adaosuriSosuri } from "~/data/single_product_options";

  const route = useRoute();
  const slug = route.params.slug as string;
  const { t, locale } = useI18n();

  const { data: product, error } = await useFetch<IWooProduct>("/api/product", {
    query: { slug, locale },
  });

  if (error.value) {
    showError({
      statusCode: error.value.statusCode ?? 500,
      message: error.value.data?.message ?? error.value.message,
    });
  }

  const category = computed(() => product.value?.categories?.[0]);
  const categorySlug = computed(() => `/#${category.value?.slug ?? ""}`);

  const store = useSingleProductStore();
  store.init(
    product.value?.sale_price
      ? Number(product.value.sale_price)
      : Number(product.value?.regular_price),
  );

  const breadcrumbs = ref([
    { label: t("breadcrumbs.home"), to: "/" },
    { label: category.value ? category.value?.name : "No Category", to: categorySlug.value },
    { label: product.value?.name ? product.value.name : "No Product" },
  ]);
</script>

<template>
  <div class="single-product" v-if="product">
    <div class="container">
      <!-- <UIPrettyPrint v-if="product" :data="product" /> -->
      <ProductBreadcrumb :items="breadcrumbs" />

      <div class="single-product__wrap">
        <div class="single-product__info">
          <ProductInfo
            :title="product.name"
            :description="product.description"
            :price="store.totalPrice"
          />

          <ProductActions
            :product-id="1"
            title="Menu Kebab standart"
            image="https://maxkebab.md/wp-content/uploads/2025/11/meniu-kebab-standart-600x900.jpg"
          />

          <div class="single-product__form">
            <ProductOptionGroupRadio
              title="Bautura"
              :required="true"
              name="bautura"
              :options="bautura"
            />
            <ProductOptionGroupRadio title="Sos" :required="true" name="sos" :options="sos" />
            <ProductOptionGroupTextarea
              title="Mențiuni"
              id="comentariu"
              name="comentariu"
              label="Comentariu"
            />
            <ProductOptionGroupCheckbox title="Adaosuri" :options="adaosuri" />
            <ProductOptionGroupStepper title="Adaosuri sosuri" :items="adaosuriSosuri" />
          </div>
        </div>

        <ProductGallery
          :src="product.images?.[0]?.src ?? ''"
          alt="Menu Kebab standart"
          :width="600"
          :height="900"
        />
      </div>
    </div>
  </div>
</template>
