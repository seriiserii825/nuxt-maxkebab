<script setup lang="ts">
defineProps<{
  title: string
  items: { id: string; name: string; label: string; price: number; desc: string; min: number; max: number }[]
}>()
</script>

<template>
  <div class="option-group">
    <h3 class="option-group__title">{{ title }}</h3>
    <ul class="option-group__list option-group__list--grid">
      <li v-for="item in items" :key="item.id" class="option-group__item option-group__item--number">
        <label class="option-group__label" :for="item.id">
          {{ item.label }}
          <span class="option-group__item-price">{{ item.price }} Lei</span>
          <small class="option-group__desc">{{ item.desc }}</small>
        </label>
        <div class="option-group__stepper">
          <button class="option-group__stepper-btn" type="button">−</button>
          <input
            class="option-group__stepper-input"
            type="number"
            :id="item.id"
            :name="item.name"
            value="0"
            :min="item.min"
            :max="item.max" />
          <button class="option-group__stepper-btn" type="button">+</button>
        </div>
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
      align-items: flex-start;
      flex-direction: column;
      gap: 0.8rem;
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
    color: var(--color-red);

    &::before {
      content: "+ ";
    }
  }

  &__desc {
    display: block;
    font-size: 1.4rem;
    color: var(--text-light);
  }

  &__stepper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__stepper-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 3.2rem;
    font-size: 2.4rem;
    line-height: 1;
    background: #ececec;
    border: none;
    border-radius: 50%;
    transition: background 0.2s;
    cursor: pointer;

    &:first-child {
      color: var(--color-red);
    }

    &:last-child {
      color: var(--color-green);
    }

    &:hover {
      background: #d9d9d9;
    }
  }

  &__stepper-input {
    width: 5rem;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #000;
    border: none;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
    }
  }
}
</style>
