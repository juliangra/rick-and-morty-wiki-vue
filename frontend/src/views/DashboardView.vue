<script setup lang="ts">
import { DefaultCharacterFragment } from '@/graphql/fragments/Character'
import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { useFragment } from '@/graphql/generated'
import { GetCharactersQuery } from '@/graphql/queries/characters/GetCharacters'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/shared'
import StatusBadge from '@/views/StatusBadge.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import LinkButton from '@/components/common/LinkButton.vue'

const page = ref(1)
const handleOnPaginationChange = (value: number) => {
  page.value = value
}

const { result, error, loading, refetch } = useQuery(GetCharactersQuery, {
  page: page.value
})

const pageInfo = computed(() => useFragment(DefaultPageInfoFragment, result.value?.characters.info))
const pages = computed(() => pageInfo.value?.pages ?? 1)

const characters = computed(() =>
  useFragment(DefaultCharacterFragment, result.value?.characters.results)
)

const searchInput = ref('')

watch(page, () => {
  refetch({
    page: page.value
  })
})

const handleDebounce = useDebounceFn(() => {
  refetch({
    page: page.value,
    filter: {
      name: searchInput.value
    }
  })
  page.value = 1
}, 500)
</script>

<template>
  <div>
    <div class="flex justify-center items-center">
      <el-input
        v-model="searchInput"
        class="m-2"
        size="large"
        placeholder="Input character name"
        :prefix-icon="Search"
        @input="handleDebounce"
      />
    </div>

    <LoadingOverlay transparent v-if="loading" />
    <div v-else>
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
