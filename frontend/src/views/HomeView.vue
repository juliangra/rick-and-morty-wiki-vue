<script lang="ts" setup>
import { User, ArrowRight, Search } from '@element-plus/icons-vue'
import LinkButton from '@/components/common/LinkButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const { isAuthenticated } = storeToRefs(useAuthStore())
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <div class="flex flex-col justify-center items-center">
      <h1 class="font-bold tracking-wide text-3xl">
        Welcome to the <span class="text-blue-600">Rick and Morty</span> wiki!
      </h1>

      <span class="dark:text-gray-400 text-gray-800 my-4"
        >Browse, filter and rate your favourite Rick and Morty characters.</span
      >

      <LinkButton to="/characters" :icon="Search">Browse characters</LinkButton>

      <div v-if="!isAuthenticated">
        <el-divider content-position="center" class="bg-gray-900">or</el-divider>

        <div class="space-x-2">
          <LinkButton to="/register" :icon="User" type="success">Sign Up</LinkButton>
          <LinkButton to="/login" :icon="ArrowRight">Log in</LinkButton>
        </div>
      </div>
    </div>
  </div>
</template>
