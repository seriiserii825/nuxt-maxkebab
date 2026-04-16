<script setup lang="ts">
const { t } = useI18n();
const checkoutForm = useCheckoutFormStore();
const payment = computed({
  get: () => checkoutForm.form.payment,
  set: (v) => { checkoutForm.form.payment = v; },
});
</script>

<template>
  <div class="checkout-payment">
    <div class="checkout-payment__methods">
      <div
        class="checkout-payment__method"
        :class="{ 'checkout-payment__method--active': payment === 'cod' }"
        @click="payment = 'cod'"
      >
        <label class="checkout-payment__label">
          <span class="checkout-payment__radio"></span>
          {{ t("checkout.paymentCash") }}
        </label>
        <p class="checkout-payment__desc">{{ t("checkout.paymentCashDesc") }}</p>
      </div>

      <div
        class="checkout-payment__method"
        :class="{ 'checkout-payment__method--active': payment === 'maib' }"
        @click="payment = 'maib'"
      >
        <label class="checkout-payment__label">
          <span class="checkout-payment__radio"></span>
          {{ t("checkout.paymentOnline") }}
        </label>
        <p class="checkout-payment__desc">{{ t("checkout.paymentOnlineDesc") }}</p>
      </div>
    </div>
  </div>
</template>
