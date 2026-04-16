<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="page-checkout">
    <div class="container">
      <h1 class="page-checkout__title">{{ t("checkout.title") }}</h1>
      <div class="checkout">
        <div class="checkout__col checkout__col--form">
          <CheckoutCityTabs />
          <CheckoutShipping />
          <CheckoutPayment />
          <CheckoutBillingForm />
        </div>
        <div class="checkout__col checkout__col--summary">
          <CheckoutOrderSummary />
        </div>
      </div>
    </div>
  </div>
</template>
