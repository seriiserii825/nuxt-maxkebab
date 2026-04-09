<script setup lang="ts">
import { useCartStore } from "~/stores/useCartStore";
import { useSingleProductStore } from "~/stores/useSingleProductStore";

const props = defineProps<{
  productId: number;
  title: string;
  image: string;
}>();

const cart = useCartStore();
const single = useSingleProductStore();

function addToCart() {
  const options = Object.values(single.radioSelections).map(({ title, value }) => ({
    label: title,
    value,
  }));

  const additions = Object.values(single.checkboxOptions)
    .filter((o) => o.checked)
    .map((o) => ({ label: o.label, value: o.label, price: o.price }));

  const sauces = Object.values(single.stepperOptions)
    .filter((o) => o.count > 0)
    .map((o) => ({
      label: o.label,
      value: o.label,
      price: o.price * o.count,
      count: o.count,
    }));

  cart.addItem({
    id: props.productId,
    title: props.title,
    image: props.image,
    basePrice: single.basePrice,
    qty: single.quantity,
    options: options.length ? options : undefined,
    additions: additions.length ? additions : undefined,
    sauces: sauces.length ? sauces : undefined,
    comment: single.comment || undefined,
  });
}
</script>

<template>
  <div class="single-product__actions">
    <UIQuantitySelector />
    <button class="single-product__submit" type="button" @click="addToCart">
      Adaugă în coș
    </button>
  </div>
</template>

<style scoped lang="scss">
.single-product {
  &__actions {
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-top: 3rem;
    margin-bottom: 6.4rem;

    @media (max-width: 576px) {
      display: grid;
    }
  }

  &__submit {
    padding: 2rem 8rem;
    font-size: 2rem;
    font-weight: 800;
    line-height: 2.3rem;
    letter-spacing: -0.025em;
    color: #fff;
    background: #ee3230;
    border: none;
    border-radius: 10px;
    transition: background 0.3s;
    cursor: pointer;

    &:hover {
      background: #a72322;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
