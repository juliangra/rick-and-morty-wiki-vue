import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { DefaultUserFragment } from '@/graphql/fragments/User'
import { useFragment } from '@/graphql/generated'
import { GetUsersQuery } from '@/graphql/queries/users/GetUsers'
import { useOrderByStore } from '@/stores/orderByStore'
import { getTimeSince } from '@/utils/views/LeaderboardView'
import { useQuery } from '@vue/apollo-composable'
import { storeToRefs } from 'pinia'
import { computed, watch, type Ref } from 'vue'

/**
 * Wrapper hook for the GetUsers query.
 *
 * @param page is the page of data to fetch.
 * @returns all necessary objects and handlers for the query.
 */
const useGetUsers = (page: Ref<number>) => {
  const orderByStore = useOrderByStore()
  const { orderBy } = storeToRefs(orderByStore)

  const { result, loading, error, refetch } = useQuery(GetUsersQuery, {
    orderBy: orderBy.value,
    page: page.value
  })

  // Filter out properties from the result
  const pageInfo = computed(() => useFragment(DefaultPageInfoFragment, result.value?.users.info))
  const pages = computed(() => pageInfo.value?.pages)

  const users = computed(() => useFragment(DefaultUserFragment, result.value?.users.results))
  const tableData = computed(() =>
    users.value?.map((user) => ({
      ...user,
      createdAt: getTimeSince(user.createdAt),
      ratings: user.ratings?.length ?? 0
    }))
  )

  const handleRefetch = () => {
    refetch({
      orderBy: orderBy.value,
      page: page.value
    })
  }
  // Refetch data when the page or orderBy changes
  watch([orderBy, page], () => {
    handleRefetch()
  })

  return {
    tableData,
    pages,
    loading,
    error,
    handleRefetch
  }
}

export default useGetUsers
