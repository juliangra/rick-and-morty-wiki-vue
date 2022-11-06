import { Order } from '@/graphql/generated/graphql'
import { makeVar } from '@apollo/client'

/**
 * Reactive variable for storing the order by which users are sorted.
 */
export const orderByVar = makeVar(Order.Desc)
