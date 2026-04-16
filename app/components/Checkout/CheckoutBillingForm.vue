<script setup lang="ts">
const { t } = useI18n();
const shipping = useShippingStore();
const cityStore = useCityStore();
const checkoutForm = useCheckoutFormStore();
const { currentCity } = storeToRefs(cityStore);

const form = checkoutForm.form;
const isDelivery = computed(() => shipping.method === "delivery");
const isChisinau = computed(() => currentCity.value?.slug === "chisinau");

const officeTypes = [
  { value: "apartament", label: "Apartament" },
  { value: "casa", label: "Casă" },
  { value: "oficiu", label: "Oficiu" },
];

const sectors = [
  { value: "buiucani", label: "Buiucani" },
  { value: "durlesti", label: "Durlești" },
  { value: "centru", label: "Centru" },
  { value: "botanica", label: "Botanica" },
  { value: "posta_veche", label: "Poșta Veche" },
  { value: "sculeanca", label: "Sculeanca" },
];
</script>

<template>
  <div class="checkout-form">
    <!-- Prenume + Nume -->
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
        <label class="checkout-form__label checkout-form__label--required" for="lastName">
          {{ t("checkout.lastName") }}
        </label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          class="checkout-form__input"
          required
          autocomplete="family-name"
        />
      </div>
    </div>

    <!-- Address fields (delivery only) -->
    <template v-if="isDelivery">
      <!-- Municipiu/localitate + Stradă -->
      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label checkout-form__label--required" for="city">
            {{ t("checkout.municipality") }}
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
        <div class="checkout-form__group">
          <label class="checkout-form__label checkout-form__label--required" for="street">
            {{ t("checkout.street") }}
          </label>
          <input
            id="street"
            v-model="form.street"
            type="text"
            class="checkout-form__input"
            :placeholder="t('checkout.streetPlaceholder')"
            required
            autocomplete="street-address"
          />
        </div>
      </div>

      <!-- Nr + Apt./Oficiu -->
      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="number">
            {{ t("checkout.number") }}
          </label>
          <input
            id="number"
            v-model="form.number"
            type="text"
            class="checkout-form__input"
            placeholder="17/7"
          />
        </div>
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="officeType">
            {{ t("checkout.officeType") }}
          </label>
          <select id="officeType" v-model="form.officeType" class="checkout-form__select">
            <option value="">{{ t("checkout.selectOfficeType") }}</option>
            <option v-for="o in officeTypes" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </div>
      </div>

      <!-- Ap + Scara -->
      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="apartment">
            {{ t("checkout.apartment") }}
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
          <label class="checkout-form__label" for="staircase">
            {{ t("checkout.staircase") }}
          </label>
          <input
            id="staircase"
            v-model="form.staircase"
            type="number"
            class="checkout-form__input"
          />
        </div>
      </div>

      <!-- Etaj + Interfon -->
      <div class="checkout-form__row">
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="floor">
            {{ t("checkout.floor") }}
          </label>
          <input
            id="floor"
            v-model="form.floor"
            type="number"
            class="checkout-form__input"
            placeholder="9"
          />
        </div>
        <div class="checkout-form__group">
          <label class="checkout-form__label" for="interphone">
            {{ t("checkout.interphone") }}
          </label>
          <input
            id="interphone"
            v-model="form.interphone"
            type="text"
            class="checkout-form__input"
          />
        </div>
      </div>

      <!-- Sector (Chisinau only) -->
      <div v-if="isChisinau" class="checkout-form__row checkout-form__row--full">
        <div class="checkout-form__group">
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

    <!-- Telefon + Email -->
    <div class="checkout-form__row">
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
      <div class="checkout-form__group">
        <label class="checkout-form__label" for="email">
          {{ t("checkout.email") }}
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

    <!-- Note comandă -->
    <div class="checkout-form__row checkout-form__row--full">
      <div class="checkout-form__group">
        <label class="checkout-form__label" for="notes">
          {{ t("checkout.notes") }}
        </label>
        <textarea
          id="notes"
          v-model="form.notes"
          class="checkout-form__textarea"
          :placeholder="t('checkout.notesPlaceholder')"
        ></textarea>
      </div>
    </div>
  </div>
</template>
