<script setup lang="ts">
import type { IContactsResponse } from "~/interfaces/IContactsResponse";

const { t, locale } = useI18n();

const { data, error } = await useFetch<IContactsResponse>("/api/contacts", {
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
  { label: t("pages.contacts") },
]);

const city_store = useCityStore();
const { currentCity } = storeToRefs(city_store);

const mapSrc = computed(() =>
  currentCity.value?.slug === "ialoveni" ? data.value?.map_ialoveni : data.value?.map_chisinau
);

function clearPhone(phone: string) {
  return phone?.replace(/\s/g, "").replace(/-/g, "");
}
</script>

<template>
  <div class="contact-page">
    <div class="container">
      <ProductBreadcrumb :items="breadcrumbs" />

      <div v-if="data" class="contact-page__container">
        <div class="contact-page__info">
          <h2 class="contact-page__title">{{ t("pages.contacts") }}</h2>
          <h3 class="contact-page__company">{{ data.company_name }}</h3>

          <ul class="contact-page__list">
            <li class="contact-page__item">
              <IconPhone />
              <span>
                {{ currentCity?.slug === "ialoveni" ? t("cities.ialoveni") : t("cities.chisinau") }} —
                <a :href="`tel:${clearPhone(currentCity?.slug === 'ialoveni' ? data.phone_ialoveni : data.phone_chisinau)}`">
                  {{ currentCity?.slug === "ialoveni" ? data.phone_ialoveni : data.phone_chisinau }}
                </a>
              </span>
            </li>

            <li class="contact-page__item">
              <IconEmail />
              <a :href="`mailto:${data.email}`">{{ data.email }}</a>
            </li>

            <li class="contact-page__item">
              <span>{{ data.address_chisinau }}</span>
            </li>

            <li class="contact-page__item">
              <span>{{ data.address_ialoveni }}</span>
            </li>

            <li class="contact-page__item">
              <span>{{ data.opening_times }}</span>
            </li>

            <li v-if="data.social_links?.length" class="contact-page__item contact-page__item--social">
              <a
                v-for="(link, i) in data.social_links"
                :key="i"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer">
                <img :src="link.immagine" alt="social" />
              </a>
            </li>
          </ul>
        </div>

        <div v-if="mapSrc" class="contact-page__map">
          <iframe
            :src="mapSrc"
            width="100%"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.contact-page {
  padding: 17rem 0;
  background: linear-gradient(180deg, #fffef1 80.21%, #f1fff5 100%);
  min-height: 100vh;

  @media screen and (max-width: 1200px) {
    padding: 16rem 0 5rem;
  }

  @media screen and (max-width: 576px) {
    padding: 11rem 0 5rem;
  }

  &__container {
    display: grid;
    gap: 5rem;
    margin-top: 5rem;
    grid-template-columns: repeat(2, 1fr);

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 4rem;
    }
  }

  &__title {
    margin-bottom: 5rem;
    font-size: 3rem;
    font-weight: 700;
    border-bottom: 1px solid var(--color-red);
    padding-bottom: 1rem;
  }

  &__company {
    font-size: 4rem;
    font-weight: 300;
  }

  &__list {
    margin-top: 3rem;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 2rem 1rem;
    border-bottom: 1px solid #d9d9d9;
    font-size: 1.8rem;

    svg {
      flex-shrink: 0;
      width: 2.2rem;
      height: 2.2rem;
    }

    a:hover {
      text-decoration: underline;
    }

    &--social {
      gap: 2rem;

      img {
        width: 3.2rem;
        height: 3.2rem;
        object-fit: contain;
      }
    }
  }

  &__map {
    height: 50rem;

    iframe {
      width: 100%;
      height: 100%;
      border-radius: 1.5rem;
    }

    @media screen and (max-width: 768px) {
      height: 40rem;
    }
  }
}
</style>
