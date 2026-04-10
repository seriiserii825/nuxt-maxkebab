<script setup lang="ts">
import type { IAboutResponse } from "~/interfaces/IAboutResponse";

const { t, locale } = useI18n();

const { data, error } = await useFetch<IAboutResponse>("/api/about", {
  query: { lang: locale },
  watch: [locale],
});

if (error.value) {
  showError({
    statusCode: error.value.statusCode ?? 500,
    message: error.value.data?.message ?? error.value.message,
  });
}

const breadcrumbs = ref([
  { label: t("breadcrumbs.home"), to: "/" },
  { label: t("pages.about") },
]);
</script>

<template>
  <div class="about-page">
    <div v-if="data?.image" class="about-page__head-image">
      <img :src="data.image" alt="" />
    </div>

    <div class="about-page__body">
      <div class="container">
        <ProductBreadcrumb :items="breadcrumbs" />

        <div class="about-page__card">
          <h1 v-if="data" class="about-page__title">{{ data.title }}</h1>
          <div v-if="data" class="about-page__text" v-html="data.content" />

          <footer class="about-page__footer">
            <img class="about-page__image-bottom" src="/img/about-logo.svg" alt="" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about-page {
  background: linear-gradient(180deg, #fffef1 80.21%, #f1fff5 100%);
  min-height: 100vh;

  &__head-image {
    width: 100%;
    height: 40rem;
    overflow: hidden;

    @media screen and (max-width: 768px) {
      height: 25rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__body {
    padding: 4rem 0 17.8rem;

    @media screen and (max-width: 1200px) {
      padding-bottom: 5rem;
    }

    @media screen and (max-width: 576px) {
      padding-bottom: 5rem;
    }
  }

  &__card {
    max-width: 74rem;
    margin: 3rem auto 0;
    padding: 4rem 5rem;
    background: #fff;
    border-radius: 2rem;
    box-shadow: 0 4px 40px -10px rgba(0, 0, 0, 0.12);

    @media screen and (max-width: 768px) {
      padding: 3rem 2.5rem;
    }

    @media screen and (max-width: 576px) {
      padding: 2rem 1.5rem;
      border-radius: 1.5rem;
    }
  }

  &__title {
    margin-bottom: 2rem;
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.3;
    color: #000;
  }

  &__text {
    font-size: 1.8rem;
    line-height: 2.8rem;
    color: #222;

    p {
      margin-bottom: 1.6rem;
    }

    h2,
    h3 {
      margin: 2.4rem 0 1.2rem;
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-red);
    }

    ul {
      margin: 0 0 1.6rem;
      padding-left: 0;
      list-style: none;

      li {
        position: relative;
        padding-left: 2rem;
        margin-bottom: 1rem;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--color-red);
        }
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid #f0f0f0;
  }

  &__image-bottom {
    max-width: 20rem;
  }
}
</style>
