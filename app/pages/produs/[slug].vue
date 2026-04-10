<script setup lang="ts">
  import type { IWooProduct } from "~/interfaces/IWooProduct";
  import { useSingleProductStore } from "~/stores/useSingleProductStore";

  import type { IAddonGroup } from "~/server/api/product/addons.get";

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

  const { data: groups, error: addons_error } = await useFetch<IAddonGroup[]>(
    "/api/product/addons",
    {
      query: { product_id: product.value?.id, locale },
    },
  );

  if (addons_error.value) {
    showError({
      statusCode: addons_error.value.statusCode ?? 500,
      message: addons_error.value.data?.message ?? addons_error.value.message,
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
      <!-- <UIPrettyPrint v-if="groups" :data="groups" /> -->
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

          <div v-if="groups?.length" :key="store.resetKey" class="single-product__form">
            <template v-for="group in groups" :key="group.id">
              <ProductOptionGroupRadio v-if="group.fields[0]?.type === 'radio'" :group="group" />
              <ProductOptionGroupCheckbox
                v-else-if="
                  group.fields[0]?.type === 'checkbox' || group.fields[0]?.type === 'checkbox-group'
                "
                :group="group"
              />
              <ProductOptionGroupQuantity
                v-else-if="
                  group.fields[0]?.type === 'number' || group.fields[0]?.type === 'products'
                "
                :group="group"
              />
              <ProductOptionGroupTextarea
                v-else-if="group.fields[0]?.type === 'textarea' || group.fields[0]?.type === 'text'"
                :group="group"
              />
            </template>
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
