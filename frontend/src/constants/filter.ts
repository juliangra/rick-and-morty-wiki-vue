import type { SelectOption } from 'src/types/forms'

/**
 * These constants are not retrievable from the GraphQL API
 * and have therefore been retrieved with a custom script and hardcoded.
 * These never change, and therefore this shouldn't be an issue.
 */
export const FILTER_SPECIES: SelectOption[] = [
  {
    label: 'Human',
    value: 'human'
  },
  {
    label: 'Alien',
    value: 'alien'
  },
  {
    label: 'Humanoid',
    value: 'humanoid'
  },
  {
    label: 'Unknown',
    value: 'unknown'
  },
  {
    label: 'Poopybutthole',
    value: 'poopybutthole'
  },
  {
    label: 'Mythological Creature',
    value: 'mythological creature'
  },
  {
    label: 'Animal',
    value: 'animal'
  },
  {
    label: 'Robot',
    value: 'robot'
  },
  {
    label: 'Cronenberg',
    value: 'cronenberg'
  },
  {
    label: 'Disease',
    value: 'disease'
  }
]

export const FILTER_GENDERS: SelectOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Genderless', value: 'genderless' },
  { label: 'Unknown', value: 'unknown' }
]

export const FILTER_STATUS: SelectOption[] = [
  { label: 'Dead', value: 'dead' },
  { label: 'Alive', value: 'alive' },
  { label: 'Unknown', value: 'unknown' }
]
