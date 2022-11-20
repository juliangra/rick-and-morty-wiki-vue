import {
  SuccessFilled,
  CircleCloseFilled,
  QuestionFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import type { Component } from 'vue'

type Color = 'success' | 'warning' | 'danger' | 'default'

/**
 * Gets the icon and color to display in a status badge based on the color.
 *
 * @param status is the status of a character.
 * @returns the icon and color to display in the status badge.
 */
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

/**
 * Maps a color to a Tailwind class to display in the status badge.
 *
 * @param color is the color to map.
 * @returns the Tailwind class to use.
 */
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
