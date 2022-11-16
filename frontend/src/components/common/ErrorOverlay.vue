<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  overlay: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <div class="w-full h-full mt-0 mr-auto" :class="{ hidden: !overlay }">
    <el-alert
      class="grid grid-cols-1 place-content-center gap-2"
      :title="title ?? ''"
      :description="
        description ?? 'An unexpected error occurred! Ensure you are connected to the internet.'
      "
      type="error"
      center
      show-icon
      effect="dark"
    />
  </div>
</template>
