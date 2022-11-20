<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowLeftBold, Star, Delete } from '@element-plus/icons-vue'
import LinkButton from '@/components/common/LinkButton.vue'
import { getReadableRating } from '@/utils/character/utils'
import { useRoute, useRouter } from 'vue-router'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import HeadingText from '@/components/typography/HeadingText.vue'
import DetailsText from '@/components/typography/DetailsText.vue'
import InfoSection from '@/components/characters/InfoSection.vue'
import { useAuthStore } from '@/stores/authStore'
import ErrorOverlay from '@/components/common/ErrorOverlay.vue'
import useGetCharacterById from '@/hooks/characters/useGetCharacterById'
import useGetRating from '@/hooks/characters/useGetRating'

const route = useRoute()
const router = useRouter()
const isCurrentlyRating = ref(false)

const characterId = route.params.id as string

// Retrieve authentication status and userId
const { isAuthenticated, decoded } = useAuthStore()
const userId = decoded ? (decoded as { id: string }).id : ''

const {
  character,
  loading: characterLoading,
  error: characterError
} = useGetCharacterById(characterId)

const {
  averageRating,
  currentRating,
  loading: ratingLoading,
  error: ratingError,
  handleDeleteRating,
  handleRateCharacter,
  rating,
  ratingStats
} = useGetRating(characterId, userId, isCurrentlyRating)

const loading = characterLoading || ratingLoading
const error = characterError || ratingError

// When character ID changes, the page is reloaded to update information correctly
watch(
  () => route.params.id,
  () => {
    router.go(0)
  }
)
</script>

<template>
  <div class="my-4">
    <LinkButton to="/characters" :icon="ArrowLeftBold">Back</LinkButton>
  </div>
  <LoadingOverlay v-if="loading" />
  <ErrorOverlay v-else-if="error" />
  <div v-else class="w-full flex justify-center items-center">
    <el-card class="m-2 w-80">
      <HeadingText :title="character.name" class="font-bold" />
      <div>
        <el-image :src="character.image" class="rounded-md mx-5" :fit="'contain'" />
      </div>
      <InfoSection title="Personal details">
        <template #details>
          <DetailsText title="Status" :value="character.status" />
          <DetailsText title="Species" :value="character.species" />
          <DetailsText title="Gender" :value="character.gender" />
        </template>
      </InfoSection>
      <InfoSection title="Location">
        <template #details>
          <DetailsText title="Name" :value="character.location" />
        </template>
      </InfoSection>
      <InfoSection>
        <template #details>
          <div class="mt-2 flex items-center justify-around">
            <div class="flex flex-col items-center">
              <p class="dark:text-gray-500 text-black font-bold text-xs uppercase mb-2">
                Average rating
              </p>
              <el-progress type="circle" :width="70" :percentage="averageRating">
                <span class="text-lg text-black dark:text-gray-200">{{
                  getReadableRating(ratingStats?.average || 0)
                }}</span>
              </el-progress>
            </div>
            <div class="flex flex-col items-center">
              <p class="dark:text-gray-500 text-black font-bold text-xs uppercase mb-2">
                Number of ratings
              </p>
              <h2 class="font-bold text-2xl text-black dark:text-gray-200">
                {{ ratingStats?.count }}
              </h2>
            </div>
          </div>
        </template>
      </InfoSection>
      <InfoSection v-if="isAuthenticated">
        <template #details>
          <div class="flex mt-3">
            <el-button
              type="primary"
              plain
              class="w-full !py-5"
              :icon="Star"
              data-cy="rating-slider"
              @click="isCurrentlyRating = true"
              >Rate</el-button
            >
            <el-button
              type="danger"
              plain
              class="w-full !py-5"
              :icon="Delete"
              @click="handleDeleteRating"
              data-cy="delete-rating-button"
              v-if="rating?.value"
              >Delete rating</el-button
            >
          </div>
        </template>
      </InfoSection>
    </el-card>
  </div>
  <el-dialog v-model="isCurrentlyRating" title="Rate character" class="min-w-[250px] max-w-[350px]">
    <div class="flex justify-center">
      <el-rate v-model="currentRating" size="large" />
    </div>
    <template #footer>
      <span class="flex justify-center md:justify-end items-center">
        <el-button @click="isCurrentlyRating = false">Cancel</el-button>
        <el-button type="primary" @click="handleRateCharacter">Save rating</el-button>
      </span>
    </template>
  </el-dialog>
</template>
