<script setup lang="ts">
const { t } = useI18n();
const shipping = useShippingStore();
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

const isDelivery = computed(() => shipping.method === "delivery");
const isChisinau = computed(() => currentCity.value?.slug === "chisinau");

const sectors = [
  { value: "buiucani", label: "Buiucani" },
  { value: "durlesti", label: "Durlești" },
  { value: "centru", label: "Centru" },
  { value: "botanica", label: "Botanica" },
  { value: "posta_veche", label: "Poșta Veche" },
  { value: "sculeanca", label: "Sculeanca" },
];

const form = reactive({
  firstName: "",
  phone: "",
  email: "",
  street: "",
  number: "",
  apartment: "",
  staircase: "",
  floor: "",
  interphone: "",
  sector: "",
});
</script>

<template>
  <div class="checkout-form">
    <div class="checkout-form__row">
      <div class="checkout-form__group">
        <label class="checkout-form__label checkout-form__label--required" for="firstName">
          {{ t("checkout.firstName") }}
        </label>
        <input
          id="firstName"
          v-model="form.firstName"
          type="text"
          class="checkout-form__input"
          required
          autocomplete="given-name"
        />
      </div>

      <div class="checkout-form__group">
        <label class="checkout-form__label checkout-form__label--required" for="phone">
          {{ t("checkout.phone") }}
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="checkout-form__input"
          required
          autocomplete="tel"
        />
      </div>
    </div>

    <div class="checkout-form__row checkout-form__row--full">
      <div class="checkout-form__group">
        <label class="checkout-form__label" for="email">
          {{ t("checkout.email") }}
          <span class="checkout-form__optional">({{ t("checkout.optional") }})</span>
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="checkout-form__input"
          autocomplete="email"
        />
      </div>
    </div>

    <template v-if="isDelivery">
      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label checkout-form__label--required" for="street">
            {{ t("checkout.street") }}
          </label>
          <input
            id="street"
            v-model="form.street"
            type="text"
            class="checkout-form__input"
            required
            autocomplete="street-address"
          />
        </div>

        <div class="checkout-form__group">
          <label class="checkout-form__label" for="number">
            {{ t("checkout.number") }}
            <span class="checkout-form__optional">({{ t("checkout.optional") }})</span>
          </label>
          <input
            id="number"
            v-model="form.number"
            type="text"
            class="checkout-form__input"
            placeholder="17/7"
          />
        </div>
      </div>

      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="apartment">
            {{ t("checkout.apartment") }}
            <span class="checkout-form__optional">({{ t("checkout.optional") }})</span>
          </label>
          <input
            id="apartment"
            v-model="form.apartment"
            type="number"
            class="checkout-form__input"
            placeholder="12"
          />
        </div>

        <div class="checkout-form__group">
          <label class="checkout-form__label" for="city">
            {{ t("checkout.city") }}
          </label>
          <input
            id="city"
            :value="currentCity ? $t(currentCity.text) : ''"
            type="text"
            class="checkout-form__input"
            readonly
            autocomplete="address-level2"
          />
        </div>
      </div>

      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="staircase">
            {{ t("checkout.staircase") }}
            <span class="checkout-form__optional">({{ t("checkout.optional") }})</span>
          </label>
          <input
            id="staircase"
            v-model="form.staircase"
            type="number"
            class="checkout-form__input"
          />
        </div>

        <div class="checkout-form__group">
          <label class="checkout-form__label" for="floor">
            {{ t("checkout.floor") }}
            <span class="checkout-form__optional">({{ t("checkout.optional") }})</span>
          </label>
          <input
            id="floor"
            v-model="form.floor"
            type="number"
            class="checkout-form__input"
            placeholder="9"
          />
        </div>
      </div>

      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="interphone">
            {{ t("checkout.interphone") }}
            <span class="checkout-form__optional">({{ t("checkout.optional") }})</span>
          </label>
          <input
            id="interphone"
            v-model="form.interphone"
            type="text"
            class="checkout-form__input"
          />
        </div>

        <div v-if="isChisinau" class="checkout-form__group">
          <label class="checkout-form__label" for="sector">
            {{ t("checkout.sector") }}
            <span class="checkout-form__optional">({{ t("checkout.optional") }})</span>
          </label>
          <select id="sector" v-model="form.sector" class="checkout-form__select">
            <option value="">{{ t("checkout.selectSector") }}</option>
            <option v-for="s in sectors" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
        </div>
      </div>
    </template>
  </div>
</template>
