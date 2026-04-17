<script setup lang="ts">
const { t } = useI18n();
const router = useRouter();
const cart = useCartStore();
const cityStore = useCityStore();
const shipping = useShippingStore();
const checkoutForm = useCheckoutFormStore();
const { currentCity } = storeToRefs(cityStore);

const loading = ref(false);
const error = ref("");

async function submit() {
  error.value = "";
  const f = checkoutForm.form;

  if (!f.firstName || !f.lastName || !f.phone) {
    error.value = t("checkout.errorRequired");
    return;
  }
  if (shipping.method === "delivery" && !f.street) {
    error.value = t("checkout.errorStreet");
    return;
  }

  loading.value = true;
  try {
    const { order_id } = await $fetch<{ order_id: number }>("/api/checkout", {
      method: "POST",
      body: {
        locale:     useNuxtApp().$i18n.locale.value,
        firstName:  f.firstName,
        lastName:   f.lastName,
        phone:      f.phone,
        email:      f.email,
        city:       currentCity.value ? t(currentCity.value.text) : "",
        citySlug:   currentCity.value?.slug ?? "",
        shipping:   shipping.method,
        street:     f.street,
        number:     f.number,
        apartment:  f.apartment,
        officeType: f.officeType,
        staircase:  f.staircase,
        floor:      f.floor,
        interphone: f.interphone,
        sector:     f.sector,
        payment:    f.payment,
        notes:      f.notes,
        items:      cart.items,
      },
    });

    cart.clearCart();
    checkoutForm.reset();
    router.push(`/order-received/${order_id}`);
  } catch (e) {
    const err = e as { data?: { message?: string }; message?: string };
    error.value = err?.data?.message ?? err?.message ?? t("checkout.errorGeneric");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="page-checkout">
    <div class="container">
      <h1 class="page-checkout__title">{{ t("checkout.title") }}</h1>

      <p v-if="error" class="page-checkout__error">{{ error }}</p>

      <div class="checkout">
        <div class="checkout__col checkout__col--form">
          <CheckoutCityTabs />
          <CheckoutShipping />
          <CheckoutPayment />
          <CheckoutBillingForm />
        </div>
        <div class="checkout__col checkout__col--summary">
          <CheckoutOrderSummary :loading="loading" @submit="submit" />
        </div>
      </div>
    </div>
  </div>
</template>
