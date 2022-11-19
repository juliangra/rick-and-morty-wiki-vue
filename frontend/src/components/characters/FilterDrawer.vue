<script setup lang="ts">
import { Form } from 'vee-validate'
import { FILTER_GENDERS, FILTER_SPECIES, FILTER_STATUS } from '@/constants/filter'
import { Filter, Delete } from '@element-plus/icons-vue'
import type { FilterCharacterInput } from '@/graphql/generated/graphql'

defineProps<{
  open: boolean
  filters: FilterCharacterInput
}>()

defineEmits<{
  (event: 'filter', filter: FilterCharacterInput): void
  (event: 'removeFilter'): void
  (event: 'close'): void
}>()
</script>
<template>
  <el-drawer
    :modelValue="open"
    @update:modelValue="() => $emit('close')"
    @close="$emit('close')"
    title="Filter characters"
    direction="ltr"
    size="sm:100%"
  >
    <Form @submit="$emit('filter', filters)" as="el-form" class="flex justify-around flex-col">
      Species:
      <el-select v-model="filters.species" class="m-2" placeholder="Species" size="large">
        <el-option
          v-for="item in FILTER_SPECIES"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      Gender:
      <el-select v-model="filters.gender" class="m-2" placeholder="Species" size="large">
        <el-option
          v-for="item in FILTER_GENDERS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      Status:
      <el-select
        v-model="filters.status"
        class="m-2 flex justify-around"
        placeholder="Species"
        size="large"
      >
        <el-option
          v-for="item in FILTER_STATUS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="flex mt-4">
        <el-button class="w-1/2" native-type="submit" type="primary" :icon="Filter"
          >Filter</el-button
        >
        <el-button class="w-1/2" type="danger" plain :icon="Delete" @click="$emit('removeFilter')"
          >Remove filters</el-button
        >
      </div>
    </Form>
  </el-drawer>
</template>
