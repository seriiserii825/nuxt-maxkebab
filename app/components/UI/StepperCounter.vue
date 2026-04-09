<script setup lang="ts">
const props = defineProps<{
  min?: number
  max?: number
}>()

const count = defineModel<number>({ default: 0 })

function decrement() {
  const min = props.min ?? 0
  if (count.value > min) count.value--
}

function increment() {
  const max = props.max ?? Infinity
  if (count.value < max) count.value++
}
</script>

<template>
  <div class="stepper">
    <button class="stepper__btn stepper__btn--minus" type="button" @click="decrement">−</button>
    <span class="stepper__value">{{ count }}</span>
    <button class="stepper__btn stepper__btn--plus" type="button" @click="increment">+</button>
  </div>
</template>

<style scoped lang="scss">
.stepper {
  display: flex;
  align-items: center;
  gap: 1rem;

  &__btn {
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

    &--minus {
      color: var(--color-red);
    }

    &--plus {
      color: var(--color-green);
    }

    &:hover {
      background: #d9d9d9;
    }
  }

  &__value {
    width: 5rem;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #000;
  }
}
</style>
