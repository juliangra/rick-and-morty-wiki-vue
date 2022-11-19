<script lang="ts" setup>
defineProps<{
  title: string
  value: string
}>()
</script>

<template>
  <p class="text-black dark:text-gray-200 my-1">
    {{ title }}: <span class="font-bold">{{ value }}</span>
  </p>
</template>
