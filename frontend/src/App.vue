<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/common/NavBar.vue'
</script>

<template>
  <NavBar />

  <main class="w-11/12 m-auto">
    <RouterView />
  </main>
</template>
