<script lang="ts" setup>
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { CreateUserMutation } from '@/graphql/mutations/users/CreateUser'
import client from '@/lib/apollo'
import { getSubmitFn, RegisterFormSchema } from '@/schemas/forms'
import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { set } from '@vueuse/core'
import { Field, Form } from 'vee-validate'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

provideApolloClient(client)

const isLoading = ref(false)
const formError = ref<string | null>(null)
const isError = computed(() => !!formError.value)
const { signIn } = useAuthStore()

const onSubmit = getSubmitFn(RegisterFormSchema, async (values) => {
  set(isLoading, true)
  const { username, password, email } = values

  const { mutate: createUserMutation } = useMutation(CreateUserMutation)

  const res = await createUserMutation({
    email,
    username,
    password
  })

  const { token, error: dbError } = res?.data?.createUser || {}

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

  <LoadingOverlay v-if="isLoading" />
  <el-row justify="center">
    <el-col :xs="18" :sm="10" :lg="8">
      <el-alert v-show="isError" :title="formError" :closable="false" type="error" effect="dark" />
      <Form @submit="onSubmit" :validation-schema="RegisterFormSchema" as="el-form">
        <Field name="email" v-slot="{ value, field, errorMessage }">
          <el-form-item :error="errorMessage" label="Email" required>
            <el-input
              placeholder="Email Address"
              v-bind="field"
              :validate-event="false"
              :model-value="value"
            />
          </el-form-item>
        </Field>

        <Field name="username" v-slot="{ value, field, errorMessage }">
          <el-form-item :error="errorMessage" label="Username" required>
            <el-input
              placeholder="Username"
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

        <Field name="repeatPassword" v-slot="{ value, field, errorMessage }">
          <el-form-item :error="errorMessage" label="Repeat password" required>
            <el-input
              placeholder="Password"
              v-bind="field"
              type="password"
              :validate-event="false"
              :model-value="value"
            />
          </el-form-item>
        </Field>

        <el-button class="w-full" type="primary" native-type="submit">Register</el-button>
      </Form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-form-item {
  @apply my-2;
}
</style>
