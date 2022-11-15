<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowLeftBold, Star, Delete } from '@element-plus/icons-vue'
import LinkButton from '@/components/common/LinkButton.vue'

import {
  getAverageRatingInPercentage,
  getRatingValue,
  getReadableRating
} from '@/utils/character/utils'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GetCharacterByIdQuery } from '@/graphql/queries/characters/GetCharacterById'
import { useRoute, useRouter } from 'vue-router'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { DefaultCharacterFragment } from '@/graphql/fragments/Character'
import { useFragment } from '@/graphql/generated'
import HeadingText from '@/components/typography/HeadingText.vue'
import DetailsText from '@/components/typography/DetailsText.vue'
import InfoSection from '@/components/characters/InfoSection.vue'
import { GetRatingStatsByCharacterIdQuery } from '@/graphql/queries/ratings/GetRatingStatsByCharacterId'
import { useAuthStore } from '@/stores/authStore'
import { GetRatingQuery } from '@/graphql/queries/ratings/GetRating'
import { DefaultRatingFragment } from '@/graphql/fragments/Rating'
import ErrorOverlay from '@/components/common/ErrorOverlay.vue'
import { RateCharacterMutation } from '@/graphql/mutations/ratings/RateCharacter'
import useNotification from '@/hooks/useNotification'
import { DeleteRatingMutation } from '@/graphql/mutations/ratings/DeleteRating'
import type { Character } from '@/graphql/generated/graphql'

const route = useRoute()
const router = useRouter()
const isRating = ref(false)

const characterId = route.params.id as string

// Get character by url param id
const { result, error, loading } = useQuery(GetCharacterByIdQuery, {
  characterId
})
const character = computed(
  () => useFragment(DefaultCharacterFragment, result.value?.character) as Character
)

// Get all ratings for current character
const {
  result: ratingResult,
  loading: ratingLoading,
  refetch: refetchRating
} = useQuery(GetRatingStatsByCharacterIdQuery, {
  characterId
})
const ratings = computed(() => ratingResult.value?.ratingStatsByCharacterId)

// Calculate percentage for average rating to correctly display progress-circle
const ratingPercentage = computed(() => getAverageRatingInPercentage(ratings.value?.average || 0))

// Retrieve authentication status and userId
const { isAuthenticated, decoded } = useAuthStore()
const userId = decoded ? (decoded as { id: string }).id : ''

// Fetch your own previous rating by userId
const { result: hasRated, refetch: refetchMyRating } = useQuery(GetRatingQuery, {
  characterId,
  userId
})

const currentRating = computed(() => useFragment(DefaultRatingFragment, hasRated.value?.rating))

// When your previous rating is fetched, update myRating
// to reflect your previous rating. Else, fallback to default (0)
watch(
  () => hasRated.value?.rating,
  () => {
    if (!currentRating.value) return
    myRating.value = currentRating.value?.value
  }
)

// Ref that keeps track of your own rating
const myRating = ref(0)

const { mutate: saveRating } = useMutation(RateCharacterMutation)
const { mutate: deleteRating } = useMutation(DeleteRatingMutation)

/**
 * Function that disables modal, validates rating and mutates data in database
 */
const handleSaveRating = async () => {
  isRating.value = false

  const value = getRatingValue(myRating.value)
  if (!value) return

  await saveRating({
    characterId,
    userId,
    value
  })

  useNotification({ type: 'success', title: 'Success', message: 'Rating saved successfully' })
  await handleUpdate()
}

/**
 * Function that deletes rating from DB
 */
const handleDeleteRating = async () => {
  await deleteRating({
    characterId,
    userId
  })

  // Reset your own rating to 0 upon deletion
  myRating.value = 0

  useNotification({ type: 'success', title: 'Success', message: 'Successfully deleted rating' })
  await handleUpdate()
}

// Update general rating and own rating data upon deletion or
const handleUpdate = async () => {
  refetchRating({
    characterId
  })
  refetchMyRating({
    characterId,
    userId
  })
}

// When character ID changes, reload page to update information correctly
watch(
  () => route.params.id,
  () => {
    router.go(0)
  }
)
</script>
<template>
  <LinkButton to="/characters" :icon="ArrowLeftBold">Back</LinkButton>
  <LoadingOverlay v-if="loading || ratingLoading" />
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
          <div class="mt-2 flex items-start justify-around">
            <div class="flex flex-col items-center">
              <p class="text-gray-500 font-bold text-xs uppercase mb-2">Average rating</p>
              <el-progress type="circle" :width="70" :percentage="ratingPercentage">
                <span class="text-lg text-gray-200">{{
                  getReadableRating(ratings?.average || 0)
                }}</span>
              </el-progress>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-gray-500 font-bold text-xs uppercase mb-2">Number of ratings</p>
              <h2 class="font-bold text-2xl">{{ ratings?.count }}</h2>
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
              @click="isRating = true"
              >Rate</el-button
            >
            <el-button
              type="danger"
              plain
              class="w-full !py-5"
              :icon="Delete"
              @click="handleDeleteRating"
              v-if="hasRated?.rating"
              >Delete rating</el-button
            >
          </div>
        </template>
      </InfoSection>
    </el-card>
  </div>
  <el-dialog v-model="isRating" title="Rate character" class="min-w-[250px] max-w-[350px]">
    <div class="flex justify-center">
      <el-rate v-model="myRating" size="large" />
    </div>
    <template #footer>
      <span class="flex justify-center md:justify-end items-center">
        <el-button @click="isRating = false">Cancel</el-button>
        <el-button type="primary" @click="handleSaveRating"> Save rating </el-button>
      </span>
    </template>
  </el-dialog>
</template>
