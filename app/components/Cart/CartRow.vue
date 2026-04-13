<script setup lang="ts">
  import { useCartStore } from "~/stores/useCartStore";
  import type { CartItem } from "~/stores/useCartStore";

  const props = defineProps<{ item: CartItem }>();
  const { t } = useI18n();
  const cart = useCartStore();

  const itemPrice = computed(() => {
    const extras =
      (props.item.additions?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0) +
      (props.item.sauces?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0);
    return props.item.basePrice + extras;
  });

  const subtotal = computed(() => itemPrice.value * props.item.qty);
</script>

<template>
  <div class="cart-row">
    <div class="cart-row__remove">
      <button
        class="cart-row__remove-btn"
        type="button"
        :aria-label="t('miniCart.remove')"
        @click="cart.removeItem(item.uid)">
        ×
      </button>
    </div>

    <div class="cart-row__thumb">
      <img :src="item.image" :alt="item.title" />
    </div>

    <div class="cart-row__info">
      <span class="cart-row__name">{{ item.title }}</span>

      <ul v-if="item.options?.length" class="cart-row__extras">
        <li v-for="opt in item.options" :key="opt.label" class="cart-row__extra">
          <span class="cart-row__extra-label">{{ opt.label }}</span>
          <span class="cart-row__extra-value">{{ opt.value }}</span>
        </li>
      </ul>

      <template v-if="item.additions?.length">
        <span class="cart-row__extras-title">{{ t("miniCart.additions") }}:</span>
        <ul class="cart-row__extras cart-row__extras--additions">
          <li v-for="add in item.additions" :key="add.label" class="cart-row__extra">
            + {{ add.label }}
            <span class="cart-row__extra-price">+{{ add.price }} Lei</span>
          </li>
        </ul>
      </template>

      <template v-if="item.sauces?.length">
        <span class="cart-row__extras-title">{{ t("miniCart.additions_sausage") }}:</span>
        <ul class="cart-row__extras cart-row__extras--sauces">
          <li v-for="sauce in item.sauces" :key="sauce.label" class="cart-row__extra">
            {{ sauce.label }}
            <span v-if="sauce.count" class="cart-row__extra-count">x{{ sauce.count }}</span>
            <span class="cart-row__extra-price">+{{ sauce.price }} Lei</span>
          </li>
        </ul>
      </template>
    </div>

    <div class="cart-row__price">{{ itemPrice }} Lei</div>

    <div class="cart-row__qty">
      <UIQuantitySelector
        :qty="item.qty"
        @decrease="cart.decreaseQty(item.uid)"
        @increase="cart.increaseQty(item.uid)" />
    </div>

    <div class="cart-row__subtotal">{{ subtotal }} Lei</div>
  </div>
</template>
