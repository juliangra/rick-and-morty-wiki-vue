<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">login</RouterLink>
        <RouterLink to="/dashboard">dashboard</RouterLink>
        <RouterLink to="/characters/1">character 1</RouterLink>
        <RouterLink to="/leaderboard">leaderboard</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
