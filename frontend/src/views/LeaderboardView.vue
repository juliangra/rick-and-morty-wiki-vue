<script lang="ts" setup>
import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { DefaultUserFragment } from '@/graphql/fragments/User'
import { useFragment } from '@/graphql/generated/fragment-masking'
import { GetUsersQuery } from '@/graphql/queries/users/GetUsers'
import { useOrderByStore } from '@/stores/orderBy'
import { useQuery } from '@vue/apollo-composable'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import ErrorOverlay from '@/components/common/ErrorOverlay.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import OrderBySelect from '@/components/forms/OrderBySelect.vue'
import HeadingText from '@/components/typography/HeadingText.vue'
import { getTimeSince } from '@/utils/views/LeaderboardView'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const orderByStore = useOrderByStore()
const { orderBy } = storeToRefs(orderByStore)

const page = ref(1)
const handleOnPaginationChange = (value: number) => {
  page.value = value
}

const { result, loading, error, refetch } = useQuery(GetUsersQuery, {
  orderBy: orderBy.value,
  page: page.value
})

const pageInfo = computed(() => useFragment(DefaultPageInfoFragment, result.value?.users.info))
const pages = computed(() => pageInfo.value?.pages ?? 1)

const users = computed(() => useFragment(DefaultUserFragment, result.value?.users.results))
const tableData = computed(() =>
  users?.value?.map((user) => ({
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

const { sm } = useBreakpoints(breakpointsTailwind)
</script>

<template>
  <HeadingText title="Leaderboard" />

  <LoadingOverlay v-if="loading" />
  <ErrorOverlay v-else-if="error" />

  <div v-else>
    <div class="flex justify-start">
      <OrderBySelect />
    </div>

    <el-table :data="tableData" class="w-11/12">
      <el-table-column prop="username" label="Username" class="w-1/2 md:w-1/4" />
      <el-table-column prop="email" label="E-mail" class="w-1/4" v-if="sm" />
      <el-table-column prop="createdAt" label="Created" class="w-1/4" v-if="sm" />
      <el-table-column prop="ratings" label="Ratings" class="w-1/2 md:w-1/4" />
    </el-table>

    <PaginationBar
      :pageCount="pages"
      :currentPage="page"
      :onPageChange="handleOnPaginationChange"
    />
  </div>
</template>
