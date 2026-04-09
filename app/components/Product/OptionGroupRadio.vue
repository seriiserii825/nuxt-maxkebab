<script setup lang="ts">
defineProps<{
  title: string
  required?: boolean
  name: string
  options: { value: string; label: string; checked?: boolean }[]
}>()
</script>

<template>
  <div class="option-group">
    <h3 class="option-group__title">
      {{ title }}
      <span v-if="required" class="option-group__required">*</span>
    </h3>
    <ul class="option-group__list">
      <li v-for="option in options" :key="option.value" class="option-group__item">
        <label class="option-group__label">
          <input
            class="option-group__radio"
            type="radio"
            :name="name"
            :value="option.value"
            :checked="option.checked" />
          <span class="option-group__text">{{ option.label }}</span>
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
