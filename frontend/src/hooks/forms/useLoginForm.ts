import { AuthenticateUserMutation } from '@/graphql/mutations/users/AuthenticateUser'
import { getSubmitFn, LoginFormSchema } from '@/schemas/forms'
import { useAuthStore } from '@/stores/authStore'
import type { LoginFormType } from '@/types/forms'
import { useMutation } from '@vue/apollo-composable'
import { set } from '@vueuse/core'
import { ref, computed } from 'vue'

/**
 * Wrapper hook for the AuthenticateUser mutation.
 *
 * @returns all necessary objects and handlers for the mutation.
 */
const useLoginForm = () => {
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)
  const error = computed(() => !!errorMessage.value)

  const { signIn } = useAuthStore()

  const onSubmit = getSubmitFn(LoginFormSchema, async (values: LoginFormType) => {
    set(loading, true)
    const { identifier, password } = values

    const { mutate: authenticateUserMutation } = useMutation(AuthenticateUserMutation)

    const response = await authenticateUserMutation({
      identifier,
      password
    })

    const { token, error: authenticateUserError } = response?.data?.authenticateUser || {}

    set(loading, false)

    if (authenticateUserError || !token) {
      set(errorMessage, authenticateUserError)
      return
    }

    set(errorMessage, null)
    await signIn(token)
  })

  return {
    loading,
    errorMessage,
    error,
    onSubmit
  }
}

export default useLoginForm
