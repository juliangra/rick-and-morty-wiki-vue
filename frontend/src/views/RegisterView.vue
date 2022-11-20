<script lang="ts" setup>
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import client from '@/lib/apollo'
import { RegisterFormSchema } from '@/schemas/forms'
import { provideApolloClient } from '@vue/apollo-composable'
import { Field, Form } from 'vee-validate'
import HeadingText from '@/components/typography/HeadingText.vue'
import useRegisterForm from '@/hooks/forms/useRegisterForm'

provideApolloClient(client)
const { loading, error, errorMessage, onSubmit } = useRegisterForm()
</script>

<template>
  <HeadingText title="Register new user" />

  <LoadingOverlay v-if="loading" />
  <el-row justify="center">
    <el-col :xs="18" :sm="10" :lg="8">
      <el-alert v-show="error" :title="errorMessage" :closable="false" type="error" data-cy="alert" />
      <Form @submit="onSubmit" :validation-schema="RegisterFormSchema" as="el-form" data-cy="register-form">
        <Field name="email" v-slot="{ value, field, errorMessage }">
          <el-form-item :error="errorMessage" label="Email" required>
            <el-input
              placeholder="Email Address"
              v-bind="field"
              :validate-event="false"
              :model-value="value"
              data-cy="email-input"
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
              data-cy="username-input"
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
              data-cy="password-input"
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
              data-cy="repeatPassword-input"
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
  @apply my-4;
}
</style>
