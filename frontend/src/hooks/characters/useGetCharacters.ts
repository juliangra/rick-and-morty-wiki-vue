import { DefaultCharacterFragment } from '@/graphql/fragments/Character'
import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { useFragment } from '@/graphql/generated'
import type { FilterCharacterInput } from '@/graphql/generated/graphql'
import { GetCharactersQuery } from '@/graphql/queries/characters/GetCharacters'
import { useQuery } from '@vue/apollo-composable'
import { useDebounceFn } from '@vueuse/core'
import { ref, computed, watch, type Ref } from 'vue'

/**
 * Wrapper hook for the GetCharacters query.
 * @param page is the page of data to fetch.
 * @param isDrawerOpen is the state of the filter drawer. This is closed when refetching data.
 * @returns all necessary objects and handlers for the query.
 */
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

  // Filter out properties from the result
  const pageInfo = computed(() =>
    useFragment(DefaultPageInfoFragment, result.value?.characters.info)
  )
  const pages = computed(() => pageInfo.value?.pages ?? 1)
  const characters = computed(() =>
    useFragment(DefaultCharacterFragment, result.value?.characters.results)
  )

  // Refetch data when the page changes
  watch(page, () => {
    refetch({
      page: page.value,
      filter: filters.value
    })
  })

  // Refetch data when the filters change, and reset page to 1
  watch(filters, () => {
    page.value = 1

    refetch({
      page: page.value,
      filter: filters.value
    })
  })

  /**
   * Debounces the input to prevent refetching on every keystroke, and resets the page.
   **/
  const handleOnInputChange = useDebounceFn(() => {
    refetch({
      page: page.value,
      filter: filters.value
    })
    page.value = 1
  }, 500)

  /**
   * Submits the filters. Resets the page and the state of the drawer.
   * @param filter is the filter to submit.
   */
  const handleSubmit = (filter?: FilterCharacterInput) => {
    filters.value = filter ?? filters.value
    page.value = 1

    refetch({
      page: page.value,
      filter: filters.value
    })

    isDrawerOpen.value = false
  }

  /**
   * Removes all filters, except for the name.
   */
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
