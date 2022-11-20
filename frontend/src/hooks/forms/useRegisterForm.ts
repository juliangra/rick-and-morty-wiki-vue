import { CreateUserMutation } from '@/graphql/mutations/users/CreateUser'
import { getSubmitFn, RegisterFormSchema } from '@/schemas/forms'
import { useAuthStore } from '@/stores/authStore'
import { useMutation } from '@vue/apollo-composable'
import { set } from '@vueuse/core'
import { ref, computed } from 'vue'

/**
 * Wrapper hook for the CreateUser mutation.
 *
 * @returns all necessary objects and handlers for the mutation.
 */
const useRegisterForm = () => {
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)
  const error = computed(() => !!errorMessage.value)

  const { signIn } = useAuthStore()

  const onSubmit = getSubmitFn(RegisterFormSchema, async (values) => {
    set(loading, true)
    const { username, password, email } = values

    const { mutate: createUserMutation } = useMutation(CreateUserMutation)

    const response = await createUserMutation({
      email,
      username,
      password
    })

    const { token, error: createUserError } = response?.data?.createUser || {}

    set(loading, false)

    if (createUserError || !token) {
      set(errorMessage, createUserError)
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

export default useRegisterForm
