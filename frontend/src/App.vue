<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { watch } from 'vue';
import { RouterView } from 'vue-router';

const isDark = useDark();
const toggleDark = useToggle(isDark);

watch(isDark, (value) => {
  console.log(value);
});
</script>

<template>
  <html class="dark">
    <el-button type="primary" @click="toggleDark()">toggle dark mode</el-button>

    <RouterView />
  </html>
</template>
