<script setup lang="ts">
import type { IFooterResponse } from "~/interfaces/IFooterResponse";

const { locale } = useI18n();
const { t } = useI18n();
import { menu } from "~/data/menu";

const { data: footer_data, error } = await useFetch<IFooterResponse>("/api/footer");

if (error.value) {
  showError({
    statusCode: error.value.statusCode ?? 500,
    message: error.value.data?.message ?? error.value.message,
  });
}

const footer = computed(() => footer_data.value?.footer);

const full_company_name = computed(() => {
  const f = footer.value;
  if (!f) return "";
  if (locale.value === "ru") return f.full_company_name_ru;
  if (locale.value === "en") return f.full_company_name_en;
  return f.full_company_name_ro;
});
</script>

<template>
  <footer class="main-footer">
    <div class="main-footer__top">
      <div class="main-footer__top__info">
        <h1>{{ full_company_name || "Max Kebab" }}</h1>
        <ul>
          <li>
            <IconPhone />
            <a v-if="footer?.phone_number_chisinau" :href="`tel:${footer.phone_number_chisinau}`">
              {{ t("cities.chisinau") }} - {{ footer.phone_number_chisinau }}
            </a>
            <template v-else>
              <a href="tel:068646410">{{ t("cities.chisinau") }} - 068646410</a>
            </template>
            &nbsp;|&nbsp;
            <a v-if="footer?.phone_number_ialoveni" :href="`tel:${footer.phone_number_ialoveni}`">
              {{ t("cities.ialoveni") }} - {{ footer.phone_number_ialoveni }}
            </a>
            <template v-else>
              <a href="tel:060649964">{{ t("citites.chisinau") }} - 060649964</a>
            </template>
          </li>
          <li>
            <IconEmail />
            <a v-if="footer?.email" :href="`mailto:${footer.email}`">
              {{ footer.email }}
            </a>
            <a v-else href="mailto:officemaxkebab@gmail.com">officemaxkebab@gmail.com</a>
          </li>
          <li class="main-footer__delivery-links">
            <a
              href="https://glovo.go.link/open?adjust_deeplink=glovoapp%3A%2F%2Fopen%3Flink_type%3Dstore%26store_id%3D509901&amp;adjust_t=s321jkn"
              target="_blank"
              rel="noopener noreferrer">
              <IconGlovoFooter />
            </a>
            <a
              href="https://straus.md/restaurant/max-kebab"
              target="_blank"
              rel="noopener noreferrer">
              <IconStraussFooter />
            </a>
          </li>
        </ul>
      </div>
      <div class="main-footer__top__menu">
        <ul>
          <li v-for="item in menu" :key="item.href" :class="item.sub_menu ? 'menu-menu' : ''">
            <NuxtLink :href="$localePath(item.href)">{{ t(item.text) }}</NuxtLink>
          </li>
        </ul>
        <div class="main-footer__top__partner">
          Max Kebab {{ t("footer.ales") }} Bludelego
          <a v-if="footer?.partner_url" :href="footer.partner_url" target="_blank">
            <img v-if="footer?.parnter_logo" :src="footer.parnter_logo" alt="Partner logo" />
          </a>
          <a v-else href="https://bludelego.it/" target="_blank">
            <img src="https://maxkebab.md/wp-content/uploads/2022/10/bludelego.svg" />
          </a>
        </div>
      </div>
    </div>

    <div class="main-footer__bottom">
      <div class="main-footer__bottom__copyright">Copyright © 2026 Max Kebab</div>
      <div class="main-footer__bottom__social">
        <ul v-if="footer?.social_links?.length">
          <li v-for="(link, index) in footer.social_links" :key="index">
            <a :href="link.url" target="_blank">
              <img :src="link.immagine" alt="Social link" />
            </a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a href="https://www.instagram.com/_max_kebab_/" target="_blank">
              <img
                src="https://maxkebab.md/wp-content/uploads/2022/10/instagram.svg"
                alt="Social link" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/maxkebab17/?locale=ro_RO" target="_blank">
              <img
                src="https://maxkebab.md/wp-content/uploads/2022/10/facebook.svg"
                alt="Social link" />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@max._.kebab" target="_blank">
              <img
                src="https://maxkebab.md/wp-content/uploads/2026/01/tiktok.svg"
                alt="Social link" />
            </a>
          </li>
        </ul>
      </div>
      <div class="main-footer__bottom__terms">
        <ul>
          <li
            id="menu-item-423"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-423">
            <a href="https://maxkebab.md/termeni-si-conditii/">Termeni și condiții</a>
          </li>
          <li
            id="menu-item-132"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-132">
            <a rel="privacy-policy" href="https://maxkebab.md/privacy-policy/">
              Politică de confidențialitate
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
