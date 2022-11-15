<script setup lang="ts">
import { DefaultCharacterFragment } from '@/graphql/fragments/Character'
import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { useFragment } from '@/graphql/generated'
import { GetCharactersQuery } from '@/graphql/queries/characters/GetCharacters'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref, watch } from 'vue'
import { Search, CircleCloseFilled } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/shared'
import StatusBadge from '@/views/StatusBadge.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import LinkButton from '@/components/common/LinkButton.vue'
import type { FilterCharacterInput } from '@/graphql/generated/graphql'
import FilterDrawer from '@/components/characters/FilterDrawer.vue'

const page = ref(1)
const handleOnPaginationChange = (value: number) => {
  page.value = value
}

const filters = ref<FilterCharacterInput>({
  name: '',
  gender: '',
  species: '',
  status: '',
  type: ''
})

const { result, error, loading, refetch } = useQuery(GetCharactersQuery, {
  page: page.value
})

const pageInfo = computed(() => useFragment(DefaultPageInfoFragment, result.value?.characters.info))
const pages = computed(() => pageInfo.value?.pages ?? 1)

const characters = computed(() =>
  useFragment(DefaultCharacterFragment, result.value?.characters.results)
)

const isDrawerOpen = ref(false)

watch(page, () => {
  refetch({
    page: page.value,
    filter: filters.value
  })
})

const handleDebounce = useDebounceFn(() => {
  refetch({
    page: page.value,
    filter: filters.value
  })
  page.value = 1
}, 500)

// Refetch characters with applicable filters
const handleSubmit = (f?: FilterCharacterInput) => {
  filters.value = f ?? filters.value

  refetch({
    page: page.value,
    filter: filters.value
  })

  isDrawerOpen.value = false
}

// Remove filters, keep name, and submit form
const handleRemoveFilter = () => {
  filters.value = {
    name: filters.value.name
  }
  handleSubmit()
}
</script>

<template>
  <div>
    <div class="sm:flex items-center">
      <el-button
        type="primary"
        class="ml-[9px] md:ml-[12px] !h-[38px] w-[96%] sm:w-auto"
        @click="isDrawerOpen = true"
      >
        Filter Characters
      </el-button>
      <div class="flex justify-center items-center w-full">
        <el-input
          v-model="filters.name"
          class="m-2"
          size="large"
          placeholder="Input character name"
          :prefix-icon="Search"
          @input="handleDebounce"
        />
      </div>
    </div>

    <FilterDrawer
      :open="isDrawerOpen"
      @filter="(f) => handleSubmit(f)"
      @removeFilter="handleRemoveFilter"
      @close="isDrawerOpen = false"
    />
    <LoadingOverlay transparent v-if="loading" />
    <div v-else>
      <div v-if="characters?.length === 0" class="flex justify-center items-center gap-1 w-full">
        <el-icon><CircleCloseFilled /></el-icon>
        <p>No characters found</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="character in characters" :key="character.id">
          <el-card class="m-2 relative scale-100 hover:scale-[101%]">
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
                <LinkButton :to="`/characters/${character.id}`">More information</LinkButton>
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
