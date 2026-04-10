<script setup lang="ts">
import type { IAddonGroup } from "~/server/api/product/addons.get";
import { useSingleProductStore } from "~/stores/useSingleProductStore";

const { ta } = useAddonTranslate();

const props = defineProps<{ group: IAddonGroup }>();
const store = useSingleProductStore();

props.group.fields.forEach((field) => {
  store.registerCheckbox(String(field.id), field.label, field.price);
});
</script>

<template>
  <div class="checkbox-group">
    <h3 class="checkbox-group__title">{{ ta(group.title) }}</h3>
    <ul class="checkbox-group__list">
      <li
        v-for="field in group.fields"
        :key="field.id"
        class="checkbox-group__item">
        <label class="checkbox-group__label">
          <input
            class="checkbox-group__checkbox"
            type="checkbox"
            :name="String(field.id)"
            :checked="store.checkboxOptions[String(field.id)]?.checked"
            @change="store.toggleCheckbox(String(field.id))" />
          <span class="checkbox-group__text">
            {{ ta(field.label) }}
            <span class="checkbox-group__price">+ {{ field.price }} Lei</span>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.checkbox-group {
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

  &__price {
    font-weight: 700;
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
