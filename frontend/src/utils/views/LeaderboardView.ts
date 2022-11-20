import { Order } from '@/graphql/generated/graphql'
import moment from 'moment'

export const getTimeSince = (time: string) => moment(parseInt(time)).fromNow()

/**
 * Gets the available options based on the `Order` enum.
 */
export const getSortOptions = () =>
  Object.keys(Order).map((key) => ({
    label: key,
    value: Order[key as keyof typeof Order]
  }))
