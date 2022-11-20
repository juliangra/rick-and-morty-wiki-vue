<script setup lang="ts">
import { useOrderByStore } from '@/stores/orderByStore'
import { getSortOptions } from '@/utils/views/LeaderboardView'
import { ElSelect, ElOption } from 'element-plus'
import { storeToRefs } from 'pinia'

const orderByStore = useOrderByStore()
const { orderBy } = storeToRefs(orderByStore)
const { toggleOrderBy } = useOrderByStore()

const sortOptions = getSortOptions()
</script>

<template>
  <el-select v-model="orderBy" class="my-4 mx-2" placeholder="Sort users" size="large">
    <el-option
      v-for="option in sortOptions"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      @change="toggleOrderBy"
    />
  </el-select>
</template>
