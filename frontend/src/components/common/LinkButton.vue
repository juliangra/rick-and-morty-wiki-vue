<script setup lang="ts">
import type { Component, PropType } from 'vue'

const { to } = defineProps({
  to: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  icon: {
    type: Object as PropType<Component>,
    required: false
  },
  reload: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <router-link custom :to="to" v-slot="{ navigate }">
    <el-button @click="navigate" :type="type" :icon="icon" :plain="plain"><slot /></el-button>
  </router-link>
</template>
