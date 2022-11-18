import { DefaultCharacterFragment } from '@/graphql/fragments/Character'
import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { useFragment } from '@/graphql/generated'
import type { FilterCharacterInput } from '@/graphql/generated/graphql'
import { GetCharactersQuery } from '@/graphql/queries/characters/GetCharacters'
import { useQuery } from '@vue/apollo-composable'
import { useDebounceFn } from '@vueuse/core'
import { ref, computed, watch, type Ref } from 'vue'

const useGetCharacters = (page: Ref<number>, isDrawerOpen: Ref<boolean>) => {
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

  const pageInfo = computed(() =>
    useFragment(DefaultPageInfoFragment, result.value?.characters.info)
  )
  const pages = computed(() => pageInfo.value?.pages ?? 1)
  const characters = computed(() =>
    useFragment(DefaultCharacterFragment, result.value?.characters.results)
  )

  watch(page, () => {
    refetch({
      page: page.value,
      filter: filters.value
    })
  })

  watch(filters, () => {
    page.value = 1

    refetch({
      page: page.value,
      filter: filters.value
    })
  })

  const handleOnInputChange = useDebounceFn(() => {
    refetch({
      page: page.value,
      filter: filters.value
    })
    page.value = 1
  }, 500)

  // Refetch characters with applicable filters
  const handleSubmit = (filter?: FilterCharacterInput) => {
    filters.value = filter ?? filters.value
    page.value = 1

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

  return {
    characters,
    pages,
    filters,
    loading,
    error,
    handleOnInputChange,
    handleRemoveFilter,
    handleSubmit
  }
}

export default useGetCharacters
