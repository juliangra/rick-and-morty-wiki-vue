<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex justify-center items-center">
    <h1 class="text-3xl my-4">{{ title }}</h1>
  </div>
</template>
