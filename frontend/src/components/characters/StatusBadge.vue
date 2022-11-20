<script setup lang="ts">
import { getIconFromStatus, badgeColor } from '@/utils/views/DashboardView'

const { status } = defineProps<{
  status: string
}>()

const { color, icon: StatusIcon } = getIconFromStatus(status)
</script>

<template>
  <div
    class="rounded-full flex px-2 space-x-1 justify-center items-center absolute right-1 top-1 text-white"
    :class="badgeColor(color)"
  >
    <span>
      <StatusIcon class="w-4 h-4 z-10" />
    </span>
    <span>
      {{ status.toUpperCase() }}
    </span>
  </div>
</template>