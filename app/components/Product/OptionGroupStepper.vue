<script setup lang="ts">
import { computed } from "vue";
import { useSingleProductStore } from "~/stores/useSingleProductStore";

const props = defineProps<{
  title: string;
  items: {
    id: string;
    name: string;
    label: string;
    price: number;
    desc: string;
    min: number;
    max: number;
  }[];
}>();

const store = useSingleProductStore();

props.items.forEach((item) => store.registerStepper(item.id, item.label, item.price));

const stepperModels = Object.fromEntries(
  props.items.map((item) => [
    item.id,
    computed({
      get: () => store.stepperOptions[item.id]?.count ?? 0,
      set: (v: number) => store.setStepperCount(item.id, v),
    }),
  ]),
);
</script>

<template>
  <div class="option-group">
    <h3 class="option-group__title">{{ title }}</h3>
    <ul class="option-group__list option-group__list--grid">
      <li
        v-for="item in items"
        :key="item.id"
        class="option-group__item option-group__item--number">
        <UIStepperCounter v-model="stepperModels[item.id]" :min="item.min" :max="item.max" />
        <label class="option-group__label" :for="item.id">
          {{ item.label }}
          <span class="option-group__item-price">{{ item.price }} Lei</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.option-group {
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
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 0;

    &--grid {
      display: grid;
      gap: 1.2rem 1.8rem;
      grid-template-columns: repeat(2, 1fr);

      @media (max-width: 576px) {
        gap: 0.8rem;
        grid-template-columns: 1fr;
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;

    &--number {
      align-items: center;
      flex-direction: row;
      gap: 1.2rem;
    }
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

  &__item-price {
    font-size: 1.6rem;
    font-weight: 700;

    &::before {
      content: "+ ";
    }
  }

  &__desc {
    display: block;
    font-size: 1.4rem;
    color: var(--text-light);
  }
}
</style>
