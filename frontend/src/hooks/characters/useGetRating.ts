import { DefaultRatingFragment } from '@/graphql/fragments/Rating'
import { useFragment } from '@/graphql/generated'
import { DeleteRatingMutation } from '@/graphql/mutations/ratings/DeleteRating'
import { RateCharacterMutation } from '@/graphql/mutations/ratings/RateCharacter'
import { GetRatingQuery } from '@/graphql/queries/ratings/GetRating'
import { GetRatingStatsByCharacterIdQuery } from '@/graphql/queries/ratings/GetRatingStatsByCharacterId'
import { getAverageRating, getRatingValue } from '@/utils/character/utils'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { computed, ref, watch, type Ref } from 'vue'
import useNotification from '../useNotification'

const useGetRating = (characterId: string, userId: string, isCurrentlyRating: Ref<boolean>) => {
  const currentRating = ref(0)

  // Get all ratings for current character
  const {
    result: ratingStatsResult,
    loading: ratingStatsLoading,
    error: ratingStatsError,
    refetch: refetchRatingStats
  } = useQuery(GetRatingStatsByCharacterIdQuery, {
    characterId
  })
  const ratingStats = computed(() => ratingStatsResult.value?.ratingStatsByCharacterId)
  const averageRating = computed(() => getAverageRating(ratingStats.value?.average || 0))

  // Fetch your own previous rating by userId
  const {
    result: ratingResult,
    loading: ratingLoading,
    error: ratingError,
    refetch: refetchRating
  } = useQuery(GetRatingQuery, {
    characterId,
    userId
  })
  const rating = computed(() => useFragment(DefaultRatingFragment, ratingResult.value?.rating))

  watch(
    () => ratingResult.value?.rating,
    () => {
      if (!rating.value) return
      currentRating.value = rating.value?.value
    }
  )

  const { mutate: rateCharacter } = useMutation(RateCharacterMutation)
  const { mutate: deleteRating } = useMutation(DeleteRatingMutation)

  /**
   * Function that disables modal, validates rating and mutates data in database
   */
  const handleRateCharacter = async () => {
    isCurrentlyRating.value = false

    const value = getRatingValue(currentRating.value)
    if (!value) return

    await rateCharacter({
      characterId,
      userId,
      value
    })

    useNotification({ type: 'success', title: 'Success', message: 'Rating saved successfully' })
    await refetch()
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
    currentRating.value = 0

    useNotification({ type: 'success', title: 'Success', message: 'Successfully deleted rating' })
    await refetch()
  }

  // Update general rating and own rating data upon deletion or
  const refetch = async () => {
    refetchRatingStats({
      characterId
    })
    refetchRating({
      characterId,
      userId
    })
  }

  const loading = computed(() => ratingStatsLoading.value || ratingLoading.value)
  const error = computed(() => ratingStatsError.value || ratingError.value)

  return {
    currentRating,
    ratingStats,
    averageRating,
    rating,
    loading,
    error,
    handleRateCharacter,
    handleDeleteRating
  }
}

export default useGetRating
