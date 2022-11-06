import fs from 'fs/promises'
import { JSON_FILE_PATH } from '../src/constants'
import { context } from '../src/context'
import { Character } from '../src/generated/graphql'

/**
 * Populates the database with all characters from the JSON file.
 */
const populateCharactersFromApi = async () => {
  const data = await fs.readFile(JSON_FILE_PATH, 'utf-8')
  const characters = JSON.parse(data) as Character[]

  // Add all character entries to the database as a transaction
  console.log('📂 Adding characters to database...')
  await context.prisma.$transaction(
    characters.map((character) => {
      const { name, gender, image, location, species, status, type } = character
      const id = parseInt(character.id)

      const payload = {
        id,
        name,
        gender,
        image,
        location,
        species,
        status,
        type
      }

      return context.prisma.character.upsert({
        where: {
          id
        },
        create: payload,
        update: payload
      })
    })
  )

  console.log(`✅ Successfully populated database with ${characters.length} characters.`)
}

export default populateCharactersFromApi
