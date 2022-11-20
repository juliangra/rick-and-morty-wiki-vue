<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import {
  Menu,
  User,
  UserFilled,
  Plus,
  Sunny,
  Moon,
  Search,
  Histogram
} from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import LinkButton from '@/components/common/LinkButton.vue'
import { useAuthStore } from '@/stores/authStore'
import HamburgerIcon from '@/components/icons/HamburgerIcon.vue'
import { computed } from 'vue'
import useRedirect from '@/hooks/useRedirect'
const isDark = useDark()
const toggleDark = useToggle(isDark)

const headerBackground = computed(() => (isDark.value ? 'bg-black' : 'bg-gray-100'))

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const { signOut } = authStore
</script>

<template>
  <el-affix class="w-full">
    <header class="w-screen p-5 shadow-lg" :class="headerBackground">
      <div class="justify-between flex md:visible">
        <div class="flex">
          <router-link custom to="/" v-slot="{ navigate }">
            <span
              role="button"
              @click="navigate"
              index="0"
              class="w-full md:w-auto flex items-center text-xl text-blue-500 hover:text-blue-600 transition duration-500"
              >Rick and Morty API</span
            >
          </router-link>
        </div>
        <div class="hidden md:flex">
          <el-button circle @click="toggleDark()" :icon="isDark ? Sunny : Moon" />
          <LinkButton to="/leaderboard" :icon="Histogram" plain>Leaderboard</LinkButton>
          <LinkButton to="/characters" :icon="Search">Dashboard</LinkButton>
          <div class="lg pl-5" index="2" v-if="!isAuthenticated">
            <LinkButton to="/login" :icon="User" type="primary"> Log in </LinkButton>
            <LinkButton to="/register" :icon="Plus" type="success">Sign up </LinkButton>
          </div>
          <el-button v-else type="primary" @click="signOut()" :icon="UserFilled"
            >Sign out</el-button
          >
        </div>
        <div class="flex md:hidden">
          <el-dropdown class="md:collapse">
            <span class="el-dropdown-link flex items-center" :icon="Menu">
              <HamburgerIcon />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="isDark ? Sunny : Moon" @click="toggleDark()">
                  <span v-if="isDark">Light</span><span v-else>Dark</span
                  ><span class="ml-1">mode</span>
                </el-dropdown-item>

                <el-dropdown-item divided :icon="Histogram" @click="useRedirect('/leaderboard')">
                  <span role="button">Leaderboard</span>
                </el-dropdown-item>
                <el-dropdown-item :icon="Search" @click="useRedirect('/characters')">
                  <span role="button">Dashboard</span>
                </el-dropdown-item>

                <el-dropdown-item
                  divided
                  v-if="!isAuthenticated"
                  :icon="User"
                  @click="useRedirect('/login')"
                >
                  <span role="button">Log in</span>
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="!isAuthenticated"
                  :icon="Plus"
                  @click="useRedirect('/register')"
                >
                  <span role="button">Sign up</span>
                </el-dropdown-item>

                <el-dropdown-item divided v-else @click="signOut()" :icon="UserFilled"
                  >Sign out</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>
  </el-affix>
</template>
