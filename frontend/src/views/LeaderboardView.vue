<script lang="ts" setup>
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { DefaultPageInfoFragment } from '@/graphql/fragments/PageInfo'
import { DefaultUserFragment } from '@/graphql/fragments/User'
import { useFragment } from '@/graphql/generated/fragment-masking'
import { Order } from '@/graphql/generated/graphql'
import { GetUsersQuery } from '@/graphql/queries/users/GetUsers'
import { useOrderByStore } from '@/stores/orderBy'
import { useQuery } from '@vue/apollo-composable'
import moment from 'moment'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const sortOptions = Object.keys(Order).map((key) => ({
  label: key,
  value: Order[key as keyof typeof Order]
}))

const orderByStore = useOrderByStore()
const { orderBy } = storeToRefs(orderByStore)
const { toggleOrderBy } = orderByStore

const page = ref(1)

const handleOnPaginationChange = (value: number) => {
  page.value = value
}

const { result, loading, refetch } = useQuery(GetUsersQuery, {
  orderBy: orderBy.value,
  page: page.value
})

const pageInfo = computed(() => useFragment(DefaultPageInfoFragment, result.value?.users.info))
const pages = computed(() => pageInfo.value?.pages)

watch(pages, () => {
  console.log(pages.value)
})

const getTimeSince = (time: string) => moment(parseInt(time)).fromNow()

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
</script>

<template>
  <h1>Leaderboard</h1>

  <LoadingOverlay v-if="loading" />

  <el-select v-model="orderBy" class="m-2" placeholder="Sort users" size="large">
    <el-option
      v-for="option in sortOptions"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      @change="toggleOrderBy"
    />
  </el-select>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="Username" width="180" />
    <el-table-column prop="email" label="E-mail" width="180" />
    <el-table-column prop="createdAt" label="Created at" width="180" />
    <el-table-column prop="ratings" label="Ratings" />
  </el-table>

  <el-pagination
    background
    layout="prev, pager, next"
    :page-count="pages"
    :current-page="page"
    @current-change="handleOnPaginationChange"
  />
</template>
