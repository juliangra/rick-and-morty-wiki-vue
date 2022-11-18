<script lang="ts" setup>
import LinkButton from '@/components/common/LinkButton.vue'
import HeadingText from '@/components/typography/HeadingText.vue'
import { House } from '@element-plus/icons-vue'
</script>

<template>
  <div class="flex flex-col justify-center items-center space-y-8">
    <HeadingText title="404 - Not Found" />

    <div class="w-3/4 text-center">
      Oops! It looks like you are trying to access a page that does not exist.
    </div>

    <LinkButton to="/" :icon="House">Take me home</LinkButton>
  </div>
</template>
