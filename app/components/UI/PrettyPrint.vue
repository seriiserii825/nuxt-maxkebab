<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="pretty-print">
    <pre>{{ JSON.stringify(data, null, 4) }}</pre>
  </div>
</template>
