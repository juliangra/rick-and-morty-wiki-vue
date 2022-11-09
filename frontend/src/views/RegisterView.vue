<script lang="ts" setup>
import { getSubmitFn, RegisterFormSchema } from '@/schemas/forms'
import { Form, Field } from 'vee-validate'
import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { CreateUserMutation } from '@/graphql/mutations/users/CreateUser'
import client from '@/lib/apollo'
import { computed, ref } from 'vue'
import { set, useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'

provideApolloClient(client)

const isLoading = ref(false)
const formError = ref<string | null>(null)
const isError = computed(() => !!formError.value)
const router = useRouter()

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

  if (dbError) {
    set(formError, dbError)
    return
  }

  set(formError, null)
  useStorage('token', token)
  await router.push('/')
})
</script>
<template>
  <div>Register</div>

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
