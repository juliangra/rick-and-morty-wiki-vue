<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div>
    <h2 class="font-bold text-blue-400 text-xl my-2">{{ title }}</h2>
    <hr class="border-[0.5px] border-gray-700 w-full" />
  </div>
  <div class="mt-1">
    <slot name="details" />
  </div>
</template>
