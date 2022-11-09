<script lang="ts" setup>
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { AuthenticateUserMutation } from '@/graphql/mutations/users/AuthenticateUser'
import useAuthentication from '@/hooks/auth/useAuthentication'
import client from '@/lib/apollo'
import { getSubmitFn, LoginFormSchema } from '@/schemas/forms'
import type { LoginFormType } from '@/types/forms'
import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { set } from '@vueuse/core'
import { Field, Form } from 'vee-validate'
import { computed, ref } from 'vue'

provideApolloClient(client)

const isLoading = ref(false)
const formError = ref<string | null>(null)
const isError = computed(() => !!formError.value)

const { signIn } = useAuthentication()

const onSubmit = getSubmitFn(LoginFormSchema, async (values: LoginFormType) => {
  set(isLoading, true)
  const { identifier, password } = values

  const { mutate: authenticateUserMutation } = useMutation(AuthenticateUserMutation)

  const res = await authenticateUserMutation({
    identifier,
    password
  })

  const { token, error: dbError } = res?.data?.authenticateUser || {}

  set(isLoading, false)

  if (dbError || !token) {
    set(formError, dbError)
    return
  }

  set(formError, null)
  await signIn(token)
})
</script>
<template>
  <div>Login</div>

  <LoadingOverlay v-if="isLoading" />
  <el-row justify="center">
    <el-col :xs="18" :sm="10" :lg="8">
      <el-alert v-show="isError" :title="formError" :closable="false" type="error" effect="dark" />
      <Form @submit="onSubmit" :validation-schema="LoginFormSchema" as="el-form">
        <Field name="identifier" v-slot="{ value, field, errorMessage }">
          <el-form-item :error="errorMessage" label="Email address / Username" required>
            <el-input
              placeholder="Email address / Username"
              v-bind="field"
              :validate-event="false"
              :model-value="value"
            />
          </el-form-item>
        </Field>

        <Field name="password" v-slot="{ value, field, errorMessage }">
          <el-form-item :error="errorMessage" label="Password" required>
            <el-input
              placeholder="Password"
              v-bind="field"
              type="password"
              :validate-event="false"
              :model-value="value"
            />
          </el-form-item>
        </Field>

        <el-button class="w-full" type="primary" native-type="submit">Login</el-button>
      </Form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-form-item {
  @apply my-2;
}
</style>
