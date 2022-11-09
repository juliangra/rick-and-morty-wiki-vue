<script lang="ts" setup>
defineProps<{
  pageCount: number
  currentPage: number
  onPageChange: (value: number) => void
}>()
</script>

<template>
  <div class="w-full flex justify-center items-center my-8">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pageCount"
      :current-page="currentPage"
      @current-change="onPageChange"
    />
  </div>
</template>
