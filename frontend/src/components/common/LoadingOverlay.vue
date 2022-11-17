<script lang="ts" setup>
defineProps<{
  transparent?: boolean
}>()
</script>
<template>
  <div
    class="absolute h-screen w-screen top-0 left-0 opacity-70 z-10 flex justify-center items-center"
    :class="{ 'bg-black': !transparent }"
  >
    <div
      class="w-12 h-12 border-gray-200 border-4 rounded-full inline-block box-border animate-spin border-b-transparent"
    ></div>
  </div>
</template>
