import axios, { AxiosResponse } from 'axios'
import fs from 'fs/promises'
import { JSON_FILE_PATH } from '../src/constants'
import { Character } from '../src/generated/graphql'
import { ApiResponse } from '../src/types/api'

/**
 * Downloads all characters from the Rick and Morty API
 * and saves them to a JSON file.
 */
const downloadCharactersFromApi = async () => {
  const url = 'https://rickandmortyapi.com/api/character'
  const results: Character[] = []
  let next: string | null = url
  let count = 0

  // `next` controls the next page to fetch until there are no more pages
  console.log('📂 Downloading characters from API...')
  while (next !== null) {
    const data: ApiResponse = await axios
      .get(next)
      .then((res: AxiosResponse<ApiResponse>) => res.data)

    // Use only the attributes of character that we care about
    data.results.forEach((character) => {
      const { id, name, gender, type, status, species, image, location } = character

      results.push({
        id,
        name,
        gender,
        type,
        status,
        species,
        image,
        location: location.name
      })
    })

    count = data.info.count
    next = data.info.next
  }

  console.log(`✅ Added ${results.length} characters of ${count} total characters`)

  await fs.writeFile(JSON_FILE_PATH, JSON.stringify(results, null, 2), 'utf-8')
}

export default downloadCharactersFromApi
