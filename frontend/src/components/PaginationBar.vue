<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

defineProps<{
  pageCount: number
  currentPage: number
  onPageChange: (value: number) => void
}>()

const { sm } = useBreakpoints(breakpointsTailwind)
</script>

<template>
  <div class="w-full flex justify-center items-center my-8">
    <el-pagination
      v-if="pageCount > 1"
      background
      :layout="!sm ? 'prev, jumper, next' : 'prev, pager, next'"
      :page-count="pageCount"
      :current-page="currentPage"
      @current-change="onPageChange"
    />
  </div>
</template>
