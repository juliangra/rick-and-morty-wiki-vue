<script lang="ts" setup>
import {
  User,
  UserFilled,
  ArrowRight,
  Sunny,
  Moon,
  ArrowDown,
  Search,
  List
} from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import LinkButton from '@/components/common/LinkButton.vue'
import { ref } from '@vue/reactivity'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import useRedirect from '@/hooks/auth/useRedirect'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const value = ref(!useDark)

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const { signOut } = authStore
</script>

<template>
  <el-affix class="w-full bg-inherit">
    <header class="z-[100] flex justify-between h-auto w-full p-5">
      <div>
        <router-link custom to="/" v-slot="{ navigate }">
          <span @click="navigate" class="text-2xl text-blue-500 hover:cursor-pointer"
            >Rick and Morty API</span
          >
        </router-link>
      </div>
      <div class="hidden md:flex">
        <el-switch
          v-model="value"
          @click="toggleDark()"
          :active-icon="Moon"
          :inactive-icon="Sunny"
        />

        <div v-if="isAuthenticated" class="lg ml-5">
          <el-button type="default" @click="signOut()" :icon="UserFilled">Sign out</el-button>
        </div>
        <div v-else class="lg ml-5">
          <LinkButton to="/login" :icon="ArrowRight"> Log in </LinkButton>
          <LinkButton to="/register" :icon="User" type="success">Sign up </LinkButton>
        </div>
      </div>
      <div class="flex md:hidden">
        <el-dropdown>
          <el-button type="default">
            Menu
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toggleDark()">
                <el-icon class="el-icon--left"> <Sunny v-if="isDark" /> <Moon v-else /> </el-icon>
                <span v-if="isDark">Light </span><span v-else>Dark </span>
                <span class="ml-1"> mode</span>
              </el-dropdown-item>
              <el-dropdown-item @click="useRedirect('/leaderboard')">
                <el-icon class="el-icon--left">
                  <List />
                </el-icon>
                Leaderboard</el-dropdown-item
              >
              <el-dropdown-item @click="useRedirect('/characters')">
                <el-icon class="el-icon--left">
                  <Search />
                </el-icon>
                Search</el-dropdown-item
              >
              <div v-if="!isAuthenticated">
                <el-dropdown-item @click="useRedirect('/login')" divided>
                  <el-icon class="el-icon--left">
                    <ArrowRight />
                  </el-icon>
                  Sign in</el-dropdown-item
                >
                <el-dropdown-item @click="useRedirect('/register')">
                  <el-icon class="el-icon--left"> <UserFilled /> </el-icon>Sign up</el-dropdown-item
                >
              </div>
              <div v-else>
                <el-dropdown-item @click="signOut" divided>
                  <el-icon class="el-icon--left">
                    <UserFilled />
                  </el-icon>
                  Sign out</el-dropdown-item
                >
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
  </el-affix>
</template>
