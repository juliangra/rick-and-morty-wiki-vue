<script setup lang="ts">
import type { Component, PropType } from 'vue'

const { to } = defineProps({
  to: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'primary'
  },
  icon: {
    type: Object as PropType<Component>,
    required: false
  },
  reload: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <router-link custom :to="to" v-slot="{ navigate }">
    <el-button @click="navigate" :type="type" :icon="icon"><slot /></el-button>
  </router-link>
</template>
