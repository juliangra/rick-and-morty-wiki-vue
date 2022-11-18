import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { DefaultUserFragment } from '@/graphql/fragments/User'
import { useFragment } from '@/graphql/generated'
import { GetUsersQuery } from '@/graphql/queries/users/GetUsers'
import { useOrderByStore } from '@/stores/orderBy'
import { getTimeSince } from '@/utils/views/LeaderboardView'
import { useQuery } from '@vue/apollo-composable'
import { storeToRefs } from 'pinia'
import { computed, watch, type Ref } from 'vue'

const useGetUsers = (page: Ref<number>) => {
  const orderByStore = useOrderByStore()
  const { orderBy } = storeToRefs(orderByStore)

  const { result, loading, error, refetch } = useQuery(GetUsersQuery, {
    orderBy: orderBy.value,
    page: page.value
  })

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

  watch([orderBy, page], () => {
    refetch({
      orderBy: orderBy.value,
      page: page.value
    })
  })

  return {
    tableData,
    pages,
    loading,
    error
  }
}

export default useGetUsers
