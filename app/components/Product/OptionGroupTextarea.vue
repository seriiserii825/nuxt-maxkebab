<script setup lang="ts">
import type { IAddonGroup } from "~/server/api/product/addons.get";
import { useSingleProductStore } from "~/stores/useSingleProductStore";

defineProps<{ group: IAddonGroup }>();
const store = useSingleProductStore();
const { ta } = useAddonTranslate();
</script>

<template>
  <div class="textarea-group">
    <h3 class="textarea-group__title">{{ ta(group.title) }}</h3>
    <label
      v-if="group.fields[0]?.label"
      class="textarea-group__label"
      :for="String(group.fields[0].id)">
      {{ ta(group.fields[0].label) }}
    </label>
    <textarea
      class="textarea-group__textarea"
      :id="String(group.fields[0]?.id)"
      :name="String(group.fields[0]?.id)"
      :value="store.comment"
      @input="store.setComment(($event.target as HTMLTextAreaElement).value)" />
  </div>
</template>

<style scoped lang="scss">
.textarea-group {
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
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.7rem;
    font-weight: 400;
    color: #000;
    cursor: default;
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
