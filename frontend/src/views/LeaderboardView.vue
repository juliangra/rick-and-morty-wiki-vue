<script lang="ts" setup>
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import HeadingText from '@/components/typography/HeadingText.vue'
import { useOrderByStore } from '@/stores/orderByStore'
import { ElSelect, ElOption, ElTable, ElTableColumn } from 'element-plus'
import { storeToRefs } from 'pinia'
import ErrorOverlay from '@/components/common/ErrorOverlay.vue'
import useGetUsers from '@/hooks/useGetUsers'
import { getSortOptions } from '@/utils/views/LeaderboardView'
import { User } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'

const { sm, md } = useBreakpoints(breakpointsTailwind)

const page = ref(1)
const handleOnPaginationChange = (value: number) => {
  page.value = value
}

const orderByStore = useOrderByStore()
const { orderBy } = storeToRefs(orderByStore)
const { toggleOrderBy } = orderByStore

const { tableData, pages, loading, error, handleRefetch } = useGetUsers(page)

const notOne = (ratings: number) => {
  return ratings != 1
}

// Refetch data on each component mount to update number of ratings
onMounted(() => handleRefetch())
</script>
<template>
  <HeadingText title="Leaderboard" />

  <LoadingOverlay v-if="loading" />
  <ErrorOverlay v-else-if="error" />
  <div v-else>
    <el-select v-model="orderBy" class="m-2 w-1/4" placeholder="Sort users" size="large">
      <el-option
        v-for="option in getSortOptions()"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        @change="toggleOrderBy"
      />
    </el-select>

    <el-table :data="tableData" class="pt-5" width="100%">
      <el-table-column aria-label="Username column" width="auto" min-width="180px">
        <template #header>
          <span class="flex">User</span>
        </template>
        <template #default="scope">
          <div class="flex items-center">
            <el-icon><User /></el-icon>
            <span class="ml-5 mr-2 py-3 font-bold">{{ scope.row.username }}</span>
            <span v-if="md">{{ scope.row.email }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="createdAt"
        aria-label="'Created at'-column"
        width="auto"
        v-if="sm"
        class="md:pl-10"
      >
        <template #header>
          <span class="flex">Created</span>
        </template>
      </el-table-column>

      <el-table-column aria-label="Ratings-column" width="auto">
        <template #header>
          <span class="flex">Ratings</span>
        </template>
        <template #default="scope">
          <div class="flex items-center">
            <el-tag class="font-bold" round
              >{{ scope.row.ratings }} RATING<span v-if="notOne(scope.row.ratings)">S</span></el-tag
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <PaginationBar
      :pageCount="pages"
      :currentPage="page"
      :onPageChange="handleOnPaginationChange"
    />
  </div>
</template>
