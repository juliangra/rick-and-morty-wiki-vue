import moment from 'moment'

export const getTimeSince = (time: string) => moment(parseInt(time)).fromNow()
