<script setup lang="ts">
import type { IFooterResponse } from "~/interfaces/IFooterResponse";

const { locale } = useI18n();

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
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.20397 1.63733C8.80921 0.68376 7.76849 0.176214 6.7739 0.44793L2.26238 1.67834C1.37033 1.92443 0.75 2.73445 0.75 3.65726C0.75 16.3408 11.0342 26.625 23.7177 26.625C24.6405 26.625 25.4506 26.0047 25.6967 25.1126L26.9271 20.6011C27.1988 19.6065 26.6912 18.5658 25.7377 18.171L20.816 16.1203C19.9804 15.7717 19.0114 16.0127 18.4423 16.715L16.3711 19.2425C12.7619 17.5353 9.83969 14.6131 8.13249 11.0039L10.66 8.93779C11.3623 8.3636 11.6033 7.39977 11.2547 6.56412L9.20397 1.64246V1.63733Z"
                fill="black"></path>
            </svg>
            <a
              v-if="footer?.phone_number_chisinau"
              :href="`tel:${footer.phone_number_chisinau}`">
              Chișinău - {{ footer.phone_number_chisinau }}
            </a>
            <template v-else>
              <a href="tel:068646410">Chișinău - 068646410</a>
            </template>
            &nbsp;|&nbsp;
            <a
              v-if="footer?.phone_number_ialoveni"
              :href="`tel:${footer.phone_number_ialoveni}`">
              Ialoveni - {{ footer.phone_number_ialoveni }}
            </a>
            <template v-else>
              <a href="tel:060649964">Ialoveni - 060649964</a>
            </template>
          </li>
          <li>
            <svg
              width="31"
              height="24"
              viewBox="0 0 31 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31 3.875C31 1.73467 29.2653 0 27.125 0H3.875C1.7377 0 0 1.73467 0 3.875V19.375C0 21.5123 1.7377 23.25 3.875 23.25H27.125C29.2653 23.25 31 21.5123 31 19.375V3.875ZM28.0938 3.875V5.21309L17.6494 13.7865C16.4021 14.8158 14.5979 14.8158 13.3506 13.7865L2.90625 5.21309V3.82051C2.90625 3.34219 3.34219 2.85176 3.875 2.85176H27.125C27.6602 2.85176 28.0938 3.34219 28.0938 3.82051V3.875ZM28.0938 8.97305V19.375C28.0938 19.9078 27.6602 20.3438 27.125 20.3438H3.875C3.34219 20.3438 2.90625 19.9078 2.90625 19.375V8.97305L11.5039 16.0328C13.8289 17.94 17.1711 17.94 19.5506 16.0328L28.0938 8.97305Z"
                fill="black"></path>
            </svg>
            <a
              v-if="footer?.email"
              :href="`mailto:${footer.email}`">
              {{ footer.email }}
            </a>
            <a v-else href="mailto:officemaxkebab@gmail.com">officemaxkebab@gmail.com</a>
          </li>
          <li class="main-footer__delivery-links">
            <a
              href="https://glovo.go.link/open?adjust_deeplink=glovoapp%3A%2F%2Fopen%3Flink_type%3Dstore%26store_id%3D509901&amp;adjust_t=s321jkn"
              target="_blank"
              rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="103.821" height="34">
                <path
                  fill="#009E81"
                  d="M25.281 11.316c0-1.101.856-1.98 1.985-1.98 1.125 0 2.007.879 2.007 1.98v20.457c0 1.125-.882 1.98-2.007 1.98a1.96 1.96 0 0 1-1.985-1.98ZM0 22.121v-.074c0-6.453 4.945-11.93 11.918-11.93 3.477 0 5.777.832 7.883 2.348.39.293.832.855.832 1.637a2 2 0 0 1-2.008 2.007c-.54 0-.93-.222-1.25-.464-1.492-1.079-3.105-1.81-5.602-1.81-4.257 0-7.492 3.74-7.492 8.138v.074c0 4.742 3.133 8.238 7.86 8.238 2.175 0 4.16-.683 5.578-1.734v-4.328h-4.574c-.98 0-1.813-.758-1.813-1.758 0-.98.832-1.785 1.813-1.785h6.433c1.152 0 2.059.879 2.059 2.05v6.16c0 1.15-.465 1.981-1.422 2.567-1.98 1.32-4.746 2.52-8.223 2.52C4.773 33.977 0 28.844 0 22.12m0 0"></path>
                <path
                  fill="#009E81"
                  fill-rule="evenodd"
                  d="M32.379 24.906v.074c0 4.938 3.918 8.997 9.226 9.02 5.387 0 9.352-4.129 9.352-9.066v-.075c0-4.988-3.918-9.043-9.277-9.043-5.336 0-9.301 4.106-9.301 9.09m14.59 0v.074c0 3.008-2.059 5.5-5.313 5.524-3.11 0-5.312-2.543-5.312-5.57v-.075c0-3.03 2.058-5.55 5.261-5.55 3.16 0 5.364 2.543 5.364 5.597m0 0"></path>
                <path
                  fill="#009E81"
                  d="M60.941 33.926h-.195c-1.101 0-1.812-.684-2.277-1.758l-5.801-13.297c-.004-.02-.012-.035-.016-.055-.093-.28-.203-.601-.203-.925 0-.977.883-1.907 1.985-1.907 1.101 0 1.636.637 1.98 1.442l4.48 11.539 4.551-11.61c.293-.687.832-1.394 1.887-1.394 1.102 0 1.957.832 1.957 1.906 0 .367-.121.758-.219.953L63.22 32.168c-.465 1.023-1.2 1.758-2.278 1.758m0 0"></path>
                <path
                  fill="#009E81"
                  fill-rule="evenodd"
                  d="M70.707 24.906v.074c0 4.938 3.941 8.997 9.25 9.02 5.387 0 9.352-4.129 9.352-9.066v-.075c0-4.988-3.918-9.043-9.278-9.043s-9.324 4.106-9.324 9.09m14.613 0v.074c0 3.008-2.058 5.5-5.312 5.524-3.11 0-5.309-2.543-5.309-5.57v-.075c0-3.03 2.055-5.55 5.258-5.55 3.16 0 5.363 2.543 5.363 5.597M88.133 7.848C88.133 3.52 91.656 0 95.988 0s7.86 3.52 7.832 7.848a7.7 7.7 0 0 1-1.468 4.57l-.196.293-4.086 5.77s-.515.804-1.59.804h-.98c-1.102 0-1.59-.805-1.59-.805l-4.09-5.77-.218-.292a7.9 7.9 0 0 1-1.47-4.57M99 10.438l.219-.293a3.92 3.92 0 0 0 .761-2.325c0-2.199-1.789-3.98-3.992-3.98A3.984 3.984 0 0 0 92 7.82a4 4 0 0 0 .758 2.325l.222.316 3.008 4.23Zm0 0"></path>
                <path
                  fill="#009E81"
                  d="M95.965 20.652c-1.25 0-2.18.953-2.18 2.153 0 1.148.93 2.101 2.156 2.125 1.274 0 2.204-.953 2.204-2.125v-.024c0-1.176-.93-2.129-2.18-2.129m0 0"></path>
              </svg>
            </a>
            <a
              href="https://straus.md/restaurant/max-kebab"
              target="_blank"
              rel="noopener noreferrer">
              <svg
                width="432"
                height="100"
                viewBox="0 0 432 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M145.74 37.706c.09-.213.168-.44.218-.7l2.881-16.938c.146-1.42-.601-2.135-2.374-2.135h-13.746l2.12-14.792c.293-1.572-.254-2.454-2.107-2.454h-20.986c-1.827 0-2.373.716-2.667 2.276l-12.493 78.66c-3.266 18.945 8.027 18.804 21.999 18.804h13.596v.002h2.893l.001-.001c.66-.001 1.201-.465 1.299-1.07l.005-.005.478-3.102 2.235-14.348v-.023l.1-.638-.004-.004c.011-.066.021-.132.021-.2 0-.7-.59-1.265-1.32-1.265v-.001h-1.107c-.023 0-.041-.003-.064-.003h-5.506c-5.946 0-8.319-.998-7.28-7.12l5.307-33.368h12.406v.007h2.558c.048.005.094.014.144.014.629 0 1.152-.421 1.285-.985l.004-.003.004-.022.001-.005zM94.32 1.553c-.276-.361-.353-.865-.817-.865H65.79c-30.106 0-45.447 8.4-48.293 26.452l-.226 1.766c-1.943 14.025 7.081 24.3 18.79 28.135l19.865 7.09c3.353 1.196 5.415 3.666 5.415 6.947 0 3.99-3.347 7.223-7.483 7.259h-2.18c-.678.024-1.416.036-2.194.036H11.028c-1.767 0-1.98.265-2.193 1.502L5.701 98.647c-.1.529-.013.949.226 1.179a1 1 0 0 0 .324.191c.19.113.413.182.653.182q.115-.001.224-.022.303.021.692.021h38.153c26.498-.013 40.824-6.105 43.77-23.664l.564-3.27c2.37-14.192-3.56-24.295-16.346-28.718 0 0-14.852-5.412-20.63-7.335-5.816-1.936-8.272-4.291-8.272-7.632 0-3.81 3.207-6.886 7.17-6.886h38.204c.201 0 .376 0 .54-.013h.024c.088 0 .176-.011.251-.023.451-.085.814-.41.94-.83.012-.035.012-.06.025-.096.038-.156.062-.336.1-.553l2.683-18.52c.025-.192.062-.42.062-.65.012-.335-.564-.24-.739-.455m108.07 37.754c.034 0 .063-.005.097-.006h1.263c.603 0 1.105-.388 1.263-.917l.007-.005.005-.032q.031-.117.038-.242l.117-.75c.01-.063.028-.118.035-.183l2.521-16.249c.307-1.993-.467-2.99-2.08-2.99h-16.106c-15.906 0-28.973 2.85-32.092 21.797l-8.899 53.782-.006.04-.761 4.6c-.013.064-.014.118-.023.18l-.094.574v.002l-.012.071.004.005c-.009.058-.019.117-.019.177 0 .7.59 1.267 1.32 1.267h2.784v-.001h17.715v.001h2.893c.602 0 1.104-.388 1.263-.916l.007-.006.006-.034q.03-.115.037-.237l.916-5.874h-.001l7.681-46.933c1.041-6.123 3.868-7.12 10.255-7.12zm226.986-21.08h-23.479c-24.226 0-36.998 6.827-39.372 21.937l-.453 2.556c-1.627 9.69.747 18.666 12.039 22.373l15.893 5.42c5.947 1.995 7.311 3.708 6.987 6.405-.346 2.865-2.227 4.385-8.174 4.385h-30.185c-1.933 0-2.68.576-2.973 2.288L357.913 94.4l-.738 4.506-.001.002-.011.072.003.004c-.008.059-.018.117-.018.178 0 .7.59 1.266 1.32 1.266h31.683c18.118-.013 32.984-4.845 35.811-21.656l.44-2.57c1.786-10.687-.747-18.23-12.333-22.077l-17.679-5.843c-4.013-1.42-5.604-3.256-5.042-6.156.524-2.702 3.255-3.956 8.456-3.956h26.598c1.934 0 2.52-.575 2.827-2.29l2.226-15.378c.227-1.381.374-2.275-2.08-2.275M240.337 81.06h-13.399c-8.027 0-10.107-2.43-9.213-8.13.733-4.986 3.119-7.414 10.546-7.414h14.586zm-.987-63.127h-14.959c-1.48 0-2.08.575-2.373 2.275l-1.758 12.179v-.001l-.828 5.468.004.004c-.008.058-.019.117-.019.178 0 .7.591 1.266 1.321 1.266h.461c.026 0 .046.006.072.006h14.519c7.427 0 10.841 2.416 9.947 8.398l-.16 1.279-16.346.154c-21.239 0-33.119 5.267-36.839 25.503-3.56 23.932 9.214 25.493 32.838 25.493h37.198l.001-.002c.7 0 1.267-.525 1.311-1.185l.008-.006.579-3.747 8.009-51.618c2.534-15.238-.44-25.644-32.986-25.644m109.343 79.052 11.95-76.777c.293-1.572-.146-2.275-1.64-2.275h-21.692c-1.48 0-2.373.703-2.666 2.275l-9.843 60.456h-9.959c-13.373 0-14.413-1.854-11.146-21.656l6.426-38.8c.293-1.572-.307-2.275-1.787-2.275h-21.399c-1.48 0-2.521.703-2.814 2.275l-8.799 54.293c-2.919 17.17 6.894 25.926 32.213 25.926 12.224 0 27.78-.022 36.583-.025l-.012.026h2.917c.701-.001 1.267-.525 1.311-1.186.002 0 .008-.006.009-.006z"
                  fill="#fff"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="main-footer__top__menu">
        <ul>
          <li
            id="menu-item-139"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-139">
            <a href="https://maxkebab.md/oferte/">Oferte</a>
          </li>
          <li
            id="menu-item-138"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-138">
            <a href="https://maxkebab.md/despre-noi/">Despre noi</a>
          </li>
          <li
            id="menu-item-137"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
            <a href="https://maxkebab.md/contacte/">Contacte</a>
          </li>
          <li
            id="menu-item-140"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-140">
            <a href="https://maxkebab.md/livrare/">Livrare</a>
          </li>
        </ul>
        <div class="main-footer__top__partner">
          Max Kebab a ales Bludelego
          <a
            v-if="footer?.partner_url"
            :href="footer.partner_url"
            target="_blank">
            <img
              v-if="footer?.parnter_logo"
              :src="footer.parnter_logo"
              alt="Partner logo" />
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
