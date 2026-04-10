<script setup lang="ts">
import type { IAddonGroup } from "~/server/api/product/addons.get";
import { useSingleProductStore } from "~/stores/useSingleProductStore";

const props = defineProps<{ group: IAddonGroup }>();
const store = useSingleProductStore();

props.group.fields.forEach((field) => {
  store.registerStepper(String(field.id), field.label, field.price);
});

function onCount({ id, count }: { id: string; count: number }) {
  store.setStepperCount(id, count);
}
</script>

<template>
  <div class="quantity-group">
    <h3 class="quantity-group__title">{{ group.title }}</h3>
    <ul class="quantity-group__list">
      <li
        v-for="field in group.fields"
        :key="field.id"
        class="quantity-group__item">
        <UIStepperCounter
          :id="String(field.id)"
          :min="Number(field.min) || 0"
          :max="Number(field.max) || 99"
          @emit_count="onCount" />
        <label class="quantity-group__label" :for="String(field.id)">
          {{ field.label }}
          <span class="quantity-group__price">+ {{ field.price }} Lei</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.quantity-group {
  position: relative;
  margin-bottom: 4rem;
  padding: 3.5rem 2rem 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;

  &__title {
    position: absolute;
    top: -1.6rem;
    left: 3rem;
    padding: 0 1rem;
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 2.9rem;
    color: #000;
    background: #fff;
  }

  &__list {
    display: grid;
    gap: 1.2rem 1.8rem;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;

    @media (max-width: 576px) {
      gap: 0.8rem;
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1.2rem;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.7rem;
    font-weight: 300;
    line-height: 2.3rem;
    letter-spacing: -0.025em;
    color: #000;
    cursor: pointer;
  }

  &__price {
    font-size: 1.6rem;
    font-weight: 700;
  }
}
</style>
