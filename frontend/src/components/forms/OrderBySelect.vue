<script setup lang="ts">
import { Order } from '@/graphql/generated/graphql'
import { useOrderByStore } from '@/stores/orderBy'
import { ElSelect, ElOption } from 'element-plus'
import { storeToRefs } from 'pinia'

const orderByStore = useOrderByStore()
const { orderBy } = storeToRefs(orderByStore)
const { toggleOrderBy } = useOrderByStore()

const sortOptions = Object.keys(Order).map((key) => ({
  label: key,
  value: Order[key as keyof typeof Order]
}))
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
