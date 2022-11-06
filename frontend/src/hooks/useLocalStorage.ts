import type { LocalStorageKey } from '@/types/storage'
import { useStorage } from '@vueuse/core'

/**
 * A type-safe wrapper around `useStorage` that only allows pre-defined keys.
 *
 * @param key is the key to use for the local storage.
 * @param initialValue is the initial value to use if the key is not present in the local storage.
 * @returns a reactive object with the value of the local storage.
 */
const useLocalStorage = (key: LocalStorageKey, initialValue?: string) =>
  useStorage(key, initialValue)

export default useLocalStorage
