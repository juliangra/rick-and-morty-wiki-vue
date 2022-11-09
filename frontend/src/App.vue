<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { RouterView } from 'vue-router';
import useAuthentication from './hooks/auth/useAuthentication';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const { isAuthenticated, signOut } = useAuthentication()
</script>

<template>
  <el-button type="primary" @click="toggleDark()">toggle dark mode</el-button>
  <div v-if="isAuthenticated">
    <el-button type="default" @click="signOut()">Sign out</el-button>
  </div>
  <div v-else>
    <router-link to="/login">
      <el-button type="success">Sign in</el-button>
    </router-link>
    <router-link to="/register">
      <el-button type="danger">Sign up</el-button>
    </router-link>
  </div>

  <main class="w-11/12 m-auto">
    <RouterView />
  </main>
</template>
