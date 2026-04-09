<script setup lang="ts">
import { useSingleProductStore } from "~/stores/useSingleProductStore";

defineProps<{
  title: string;
  id: string;
  name: string;
  label: string;
}>();

const store = useSingleProductStore();
</script>

<template>
  <div class="option-group">
    <h3 class="option-group__title">{{ title }}</h3>
    <label class="option-group__label option-group__label--textarea" :for="id">
      {{ label }}
    </label>
    <textarea
      class="option-group__textarea"
      :id="id"
      :name="name"
      :value="store.comment"
      @input="store.setComment(($event.target as HTMLTextAreaElement).value)" />
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

    &--textarea {
      display: block;
      margin-bottom: 0.8rem;
      font-size: 1.7rem;
      font-weight: 400;
      cursor: default;
    }
  }

  &__textarea {
    display: block;
    padding: 1.6rem;
    width: 100%;
    min-height: 10rem;
    font-family: var(--font-1);
    font-size: 1.6rem;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    transition: border-color 0.2s;
    outline: none;
    resize: vertical;

    &:focus {
      border-color: var(--accent);
    }
  }
}
</style>
