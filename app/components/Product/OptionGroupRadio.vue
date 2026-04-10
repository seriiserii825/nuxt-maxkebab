<script setup lang="ts">
import type { IAddonGroup } from "~/server/api/product/addons.get";
import { useSingleProductStore } from "~/stores/useSingleProductStore";

const props = defineProps<{ group: IAddonGroup }>();
const store = useSingleProductStore();
const { ta } = useAddonTranslate();

const field = props.group.fields[0];
const name = String(field?.id ?? props.group.id);
const title = props.group.title.replace(/\s*\*\s*$/, "").trim();
const required = props.group.title.includes("*");

const firstOption = field?.options[0];
if (firstOption?.label) store.setRadio(name, title, firstOption.label);
</script>

<template>
  <div class="radio-group">
    <h3 class="radio-group__title">
      {{ ta(title) }}
      <span v-if="required" class="radio-group__required">*</span>
    </h3>
    <ul class="radio-group__list">
      <li
        v-for="(option, i) in field?.options"
        :key="i"
        class="radio-group__item">
        <label class="radio-group__label">
          <input
            class="radio-group__radio"
            type="radio"
            :name="name"
            :value="option.label"
            :checked="store.radioSelections[name]?.value === option.label || (!store.radioSelections[name] && i === 0)"
            @change="store.setRadio(name, title, option.label)" />
          <span class="radio-group__text">{{ ta(option.label) }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.radio-group {
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

  &__required {
    color: var(--color-red);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 0;
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

  &__radio {
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
      border-color: var(--color-green);

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1.6rem;
        height: 1.6rem;
        background: var(--color-green);
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
