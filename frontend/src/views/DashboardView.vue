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
    <div style="max-width: 80%; margin: 0 auto">
      <el-input
        v-model="searchInput"
        class="w-50 m-2"
        size="large"
        placeholder="Input character name"
        :prefix-icon="Search"
        @input="handleDebounce"
      />
    </div>

    <el-row :gutter="40" style="display: flex; justify-content: center">
      <LoadingOverlay v-if="loading" />
      <div v-else v-for="character in characters" :key="character.id">
        <el-col :span="25" class="relative scale-100 hover:scale-[101%] transition duration-300">
          <el-card class="m-2 no-padding relative">
            <router-link :to="'/characters/' + character.id">
              <StatusBadge :status="character.status" />
              <img
                :src="character.image"
                alt="An image of a Rick and Morty character"
                class="rounded-sm"
              />
            </router-link>

            <div style="padding: 14px">
              <h1>{{ character.name }}</h1>
              <p>Species: {{ character.species }}</p>
              <div class="mt-3 leading-3 flex justify-between items-center">
                <LinkButton :to="`/characters/${character.id}`">More information</LinkButton>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>

    <PaginationBar
      :pageCount="pages"
      :currentPage="page"
      :onPageChange="handleOnPaginationChange"
    />
  </div>
</template>

<style lang="scss">
.el-card__body {
  padding: 0 !important;
}
</style>
