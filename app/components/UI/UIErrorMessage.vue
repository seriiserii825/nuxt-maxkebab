<script setup lang="ts">
defineProps({
  errorMessage: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="error-container">
    <div class="error-container__alert">
      <svg class="error-container__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="error-container__text">
{{ errorMessage }}
</p>
    </div>
  </div>
</template>
