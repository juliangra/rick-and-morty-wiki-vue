<script lang="ts" setup>
import { GetCharactersQuery } from '@/graphql/queries/characters/GetCharacters'
import { useQuery } from '@vue/apollo-composable'

const { result, loading, error } = useQuery(GetCharactersQuery)
</script>

<template>
  <div>Home</div>
</template>
