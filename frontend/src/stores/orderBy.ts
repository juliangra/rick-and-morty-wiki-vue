import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Order } from '@/graphql/generated/graphql'

export const useOrderByStore = defineStore('orderBy', () => {
  const orderBy = ref<Order>(Order.Desc)

  const isDescending = () => orderBy.value === Order.Desc

  const toggleOrderBy = () => {
    orderBy.value = isDescending() ? Order.Asc : Order.Desc
  }

  return { orderBy, toggleOrderBy }
})
