import type { Severity } from '@/types/auth'
import { ElNotification } from 'element-plus'
// Library bug. We have to import the stylesheet manually.
import 'element-plus/es/components/notification/style/css'

type Notification = {
  type?: Severity
  title?: string
  message: string
}

/**
 * Spawns a notification instance on the bottom right corner of the screen
 *
 * @param type is a string on the format of @see{Severity}
 * @param title is an optional title for the notification. This defaults to information.
 * @param message is the message to appear in the notification
 */
const useNotification = ({ type = 'info', title = 'Information', message }: Notification) => {
  ElNotification({
    title,
    message,
    position: 'bottom-right',
    type
  })
}

export default useNotification
