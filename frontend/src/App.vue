<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

console.log(isDark.value)
</script>

<template>
  <html class="dark">
    <el-button type="primary" @click="toggleDark()">toggle dark mode</el-button>

    <RouterView />
  </html>
</template>
