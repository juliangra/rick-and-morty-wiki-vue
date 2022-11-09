<script lang="ts" setup>
import { LoginFormSchema } from '@/schemas/forms'
import type { LoginFormType } from '@/types/forms'
import { useField, useForm } from 'vee-validate'
import { watch } from 'vue'

const { handleSubmit, errors } = useForm<LoginFormType>({
  validationSchema: LoginFormSchema
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})

const { value: identifier, errorMessage: identifierError } = useField('identifier')
const { value: password, errorMessage: passwordError } = useField('password')

watch(errors, (value) => {
  console.log(value)
})
</script>

<template>
  <div>Login</div>

  <form @submit="onSubmit">
    <input name="identifier" v-model="identifier" type="text" />
    <span>{{ identifierError }}</span>
    <input name="password" v-model="password" type="password" />
    <span>{{ passwordError }}</span>
    <button>Submit</button>
  </form>
</template>
