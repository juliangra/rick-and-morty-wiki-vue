<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterView } from 'vue-router'
import useAuthentication from './hooks/auth/useAuthentication'
import { User, ArrowRight } from '@element-plus/icons-vue'
import LinkButton from '@/components/common/LinkButton.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { isAuthenticated, signOut } = useAuthentication()
</script>

<template>
  <el-button type="primary" @click="toggleDark()">toggle dark mode</el-button>
  <div v-if="isAuthenticated">
    <el-button type="default" @click="signOut()">Sign out</el-button>
  </div>
  <div v-else>
    <LinkButton to="/login" :icon="ArrowRight"> Log in </LinkButton>
    <LinkButton to="/register" :icon="User" type="success">Sign up </LinkButton>
  </div>

  <main class="w-11/12 m-auto">
    <RouterView />
  </main>
</template>
