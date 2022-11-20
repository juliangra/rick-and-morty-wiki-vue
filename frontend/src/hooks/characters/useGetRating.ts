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

/**
 * Wrapper hook for the GetRating query.
 * @param characterId is the ID of the character to fetch the rating for.
 * @param userId is the ID of the user to fetch the rating for.
 * @param isCurrentlyRating is the state of the rating dialog.
 * @returns all necessary objects and handlers for the query.
 */
const useGetRating = (characterId: string, userId: string, isCurrentlyRating: Ref<boolean>) => {
  const currentRating = ref(0)

  // Get rating stats for current character
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

  // Get current rating for current user
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

  // When the rating changes, update the current rating
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
   * Rates the character. Displays a notification if the rating was successful.
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
   * Deletes the rating. Displays a notification if the deletion was successful.
   */
  const handleDeleteRating = async () => {
    await deleteRating({
      characterId,
      userId
    })

    currentRating.value = 0

    useNotification({ type: 'success', title: 'Success', message: 'Successfully deleted rating' })
    await refetch()
  }

  /**
   * Refetches all queries related to ratings.
   */
  const refetch = async () => {
    refetchRatingStats({
      characterId
    })
    refetchRating({
      characterId,
      userId
    })
  }

  /**
   * Aggregated loading states of all queries related to a rating.
   */
  const loading = computed(() => ratingStatsLoading.value || ratingLoading.value)

  /**
   * Aggregated error states of all queries to a rating.
   */
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
