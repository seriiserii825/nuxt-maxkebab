<script setup lang="ts">
import { useSingleProductStore } from "~/stores/useSingleProductStore";

const store = useSingleProductStore();
</script>

<template>
  <div class="quantity">
    <button class="quantity__btn" type="button" @click="store.decreaseQuantity">−</button>
    <span class="quantity__value">{{ store.quantity }}</span>
    <button class="quantity__btn" type="button" @click="store.increaseQuantity">+</button>
  </div>
</template>

<style scoped lang="scss">
.quantity {
  display: flex;
  align-items: center;
  gap: 1rem;

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.5rem;
    height: 5.5rem;
    font-size: 3rem;
    line-height: 1;
    background: #ececec;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 60px -20px rgb(0, 0, 0, 25%);
    transition: background 0.2s;
    cursor: pointer;

    &:hover {
      background: #d9d9d9;
    }
  }

  &__value {
    width: 5rem;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    color: #000;
  }
}
</style>
