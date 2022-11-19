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
      class="grid grid-cols-1 place-content-center"
      :title="title ?? ''"
      :description="
        description ?? 'An unexpected error occurred! Ensure you are connected to the internet.'
      "
      type="error"
      center
      show-icon
      size="small"
      effect="dark"
    />
  </div>
</template>
<style lang="scss">
.el-alert .el-alert__description {
  margin-top: 0;
}
.el-alert .el-alert__icon.is-big {
  width: 20px;
}
</style>
