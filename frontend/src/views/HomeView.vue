<script lang="ts" setup>
import useAuthentication from '@/hooks/auth/useAuthentication'
import { User, ArrowRight, Search } from '@element-plus/icons-vue'
import LinkButton from '@/components/common/LinkButton.vue'

const { isAuthenticated } = useAuthentication()
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <div class="flex flex-col justify-center items-center">
      <h1 class="font-bold tracking-wide text-3xl text-gray-200">
        Welcome to the <span class="text-blue-600">Rick and Morty</span> wiki!
      </h1>

      <span class="text-gray-400 my-4"
        >Browse, filter and rate your favourite Rick and Morty characters.</span
      >

      <LinkButton to="/characters" :icon="Search">Browse characters</LinkButton>

      <div v-if="!isAuthenticated">
        <el-divider content-position="center">or</el-divider>

        <div class="space-x-2">
          <LinkButton to="/register" :icon="User" type="success">Sign Up</LinkButton>
          <LinkButton to="/login" :icon="ArrowRight">Log in</LinkButton>
        </div>
      </div>
    </div>
  </div>
</template>
