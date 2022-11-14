import {
  SuccessFilled,
  CircleCloseFilled,
  QuestionFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import type { Component } from 'vue'

type Color = 'success' | 'warning' | 'danger' | 'default'

export const getIconFromStatus = (status: string): { color: Color; icon: Component } => {
  switch (status) {
    case 'Alive':
      return {
        color: 'success',
        icon: SuccessFilled
      }
    case 'Dead':
      return {
        color: 'danger',
        icon: CircleCloseFilled
      }
    case 'unknown':
      return {
        color: 'default',
        icon: QuestionFilled
      }
    default:
      return {
        color: 'warning',
        icon: WarningFilled
      }
  }
}

export const badgeColor = (color: Color) => {
  switch (color) {
    case 'success':
      return 'bg-green-600'
    case 'warning':
      return 'bg-yellow-500'
    case 'default':
      return 'bg-gray-500'
    case 'danger':
      return 'bg-red-600'
    default:
      return 'bg-gray-500'
  }
}
