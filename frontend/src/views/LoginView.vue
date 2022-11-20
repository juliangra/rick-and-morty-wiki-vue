<script lang="ts" setup>
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import client from '@/lib/apollo'
import { LoginFormSchema } from '@/schemas/forms'
import { provideApolloClient } from '@vue/apollo-composable'
import { Field, Form } from 'vee-validate'
import useLoginForm from '@/hooks/forms/useLoginForm'
import HeadingText from '@/components/typography/HeadingText.vue'

provideApolloClient(client)
const { error, errorMessage, loading, onSubmit } = useLoginForm()
</script>

<template>
  <HeadingText title="Welcome back!" />

  <LoadingOverlay v-if="loading" />
  <el-row justify="center">
    <el-col :xs="18" :sm="10" :lg="8">
      <el-alert v-show="error" :title="errorMessage" :closable="false" type="error" effect="dark" data-cy="alert"/>
      <Form @submit="onSubmit" :validation-schema="LoginFormSchema" as="el-form" data-cy="login-form">
        <Field name="identifier" v-slot="{ value, field, errorMessage }">
          <el-form-item :error="errorMessage" label="Email address / Username" required>
            <el-input
              placeholder="Email address / Username"
              v-bind="field"
              :validate-event="false"
              :model-value="value"
              data-cy="identifier-input"
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

        <el-button class="w-full" type="primary" native-type="submit">Login</el-button>
      </Form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-form-item {
  @apply my-4;
}
</style>
