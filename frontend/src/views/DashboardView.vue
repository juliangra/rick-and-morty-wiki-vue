<script setup lang="ts">
import { ref } from 'vue'
import { Search, CircleCloseFilled } from '@element-plus/icons-vue'
import StatusBadge from '@/components/characters/StatusBadge.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import LinkButton from '@/components/common/LinkButton.vue'
import FilterDrawer from '@/components/characters/FilterDrawer.vue'
import ErrorOverlay from '@/components/common/ErrorOverlay.vue'
import { ElButton, ElInput, ElIcon, ElCard } from 'element-plus'
import { RouterLink } from 'vue-router'
import useGetCharacters from '@/hooks/characters/useGetCharacters'

const page = ref(1)
const handleOnPaginationChange = (value: number) => {
  page.value = value
}
const isDrawerOpen = ref(false)

const {
  characters,
  pages,
  filters,
  loading,
  error,
  handleOnInputChange,
  handleRemoveFilter,
  handleSubmit
} = useGetCharacters(page, isDrawerOpen)
</script>

<template>
  <div>
    <div class="sm:flex items-center">
      <el-button
        type="primary"
        class="ml-3 md:ml-2 !h-10 w-[95%] sm:w-auto"
        @click="isDrawerOpen = true"
      >
        Filter characters
      </el-button>
      <div class="flex justify-center items-center w-full">
        <el-input
          v-model="filters.name"
          class="m-2"
          size="large"
          placeholder="Input character name"
          autofocus
          :prefix-icon="Search"
          @input="handleOnInputChange"
        />
      </div>
    </div>

    <FilterDrawer
      :open="isDrawerOpen"
      :filters="filters"
      @filter="(filter) => handleSubmit(filter)"
      @removeFilter="handleRemoveFilter"
      @close="isDrawerOpen = false"
    />
    <LoadingOverlay transparent v-if="loading" />
    <ErrorOverlay v-else-if="error" />
    <div v-else>
      <div v-if="characters?.length === 0" class="flex justify-center items-center gap-1 w-full">
        <el-icon><CircleCloseFilled /></el-icon>
        <p>No characters found</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="character in characters" :key="character.id">
          <el-card class="m-2 relative scale-100 hover:scale-[101%] transition duration-300">
            <router-link :to="`/characters/${character.id}`">
              <StatusBadge :status="character.status" />
              <img
                :src="character.image"
                alt="An image of a Rick and Morty character"
                class="rounded-sm w-full"
              />
            </router-link>

            <div class="p-2">
              <h1 class="text-2xl font-bold">{{ character.name }}</h1>
              <span>Species: {{ character.species }}</span>
              <div class="my-2 flex justify-between items-center">
                <LinkButton :to="`/characters/${character.id}`" type="primary"
                  >More information</LinkButton
                >
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <PaginationBar
        :pageCount="pages"
        :currentPage="page"
        :onPageChange="handleOnPaginationChange"
      />
    </div>
  </div>
</template>
