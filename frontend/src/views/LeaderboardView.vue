<script lang="ts" setup>
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { ref } from 'vue'
import HeadingText from '@/components/typography/HeadingText.vue'
import { useOrderByStore } from '@/stores/orderBy'
import { ElSelect, ElOption, ElTable, ElTableColumn } from 'element-plus'
import { storeToRefs } from 'pinia'
import ErrorOverlay from '@/components/common/ErrorOverlay.vue'
import useGetUsers from '@/hooks/useGetUsers'
import { getSortOptions } from '@/utils/views/LeaderboardView'

const { sm } = useBreakpoints(breakpointsTailwind)

const page = ref(1)
const handleOnPaginationChange = (value: number) => {
  page.value = value
}

const orderByStore = useOrderByStore()
const { orderBy } = storeToRefs(orderByStore)
const { toggleOrderBy } = orderByStore

const { tableData, pages, loading, error } = useGetUsers(page)
</script>

<template>
  <HeadingText title="Leaderboard" />

  <LoadingOverlay v-if="loading" />
  <ErrorOverlay v-else-if="error" />
  <div v-else>
    <el-select v-model="orderBy" class="m-2" placeholder="Sort users" size="large">
      <el-option
        v-for="option in getSortOptions()"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        @change="toggleOrderBy"
      />
    </el-select>

    <el-table :data="tableData" class="w-full">
      <el-table-column prop="username" label="Username" width="w-1/4" />
      <el-table-column prop="email" label="E-mail" width="w-1/4" v-if="sm" />
      <el-table-column prop="createdAt" label="Created at" width="w-1/4" v-if="sm" />
      <el-table-column prop="ratings" label="Ratings" width="w-1/4" />
    </el-table>

    <PaginationBar
      :pageCount="pages"
      :currentPage="page"
      :onPageChange="handleOnPaginationChange"
    />
  </div>
</template>
