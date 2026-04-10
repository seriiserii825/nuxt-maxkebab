<script setup lang="ts">
import { useSingleProductStore } from "~/stores/useSingleProductStore";

const props = defineProps<{
  title: string;
  options: { name: string; value: string; label: string; price: number }[];
}>();

const store = useSingleProductStore();

props.options.forEach((opt) => store.registerCheckbox(opt.name, opt.label, opt.price));
</script>

<template>
  <div class="option-group">
    <h3 class="option-group__title">{{ title }}</h3>
    <ul class="option-group__list option-group__list--grid">
      <li v-for="option in options" :key="option.name" class="option-group__item">
        <label class="option-group__label">
          <input
            class="option-group__checkbox"
            type="checkbox"
            :name="option.name"
            :value="option.value"
            :checked="store.checkboxOptions[option.name]?.checked"
            @change="store.toggleCheckbox(option.name)" />
          <span class="option-group__text">{{ option.label }} + {{ option.price }} Lei</span>
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

  &__text {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__checkbox {
    position: relative;
    flex-shrink: 0;
    width: 3.2rem;
    height: 3.2rem;
    border: 3px solid #ececec;
    border-radius: 50%;
    transition: border-color 0.2s;
    appearance: none;
    cursor: pointer;

    &:hover {
      border-color: var(--color-red);
    }

    &:checked {
      border-color: var(--color-red);

      &::after {
        content: "+";
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 2.4rem;
        color: var(--color-green);
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
