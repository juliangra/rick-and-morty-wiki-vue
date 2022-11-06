import { context } from '../src/context'
import bcrypt from 'bcrypt'
import { databaseIsSeeded, getRandomRating, upsertTestUser } from '../src/utils/seed'
import { CURSOR_OFFSET } from '../src/constants'
import downloadCharactersFromApi from './download'
import populateCharactersFromApi from './populate'

/**
 * Seed the database with test data, including characters, users and ratings.
 */
const main = async () => {
  if (databaseIsSeeded()) {
    console.log('✅ Characters already downloaded. Skipping download.')
    return
  }

  // Ensure that characters exists in database
  await downloadCharactersFromApi().catch((err) => {
    throw new Error(err)
  })
  await populateCharactersFromApi().catch((err) => {
    throw new Error(err)
  })

  // These base values are used to ensure deterministic seeding
  const numberOfUsers = 3 * CURSOR_OFFSET
  const baseId = 'c01234db-a6a1-49de-98d7-3419dfe6200b'
  const basePassword = 'password'

  console.log('📂 Adding users to database...')

  // Start by adding deterministic user to be used in tests
  upsertTestUser({
    id: baseId,
    username: 'test',
    email: 'test@example.com',
    password: await bcrypt.hash(basePassword, 10)
  })

  for (let i = 0; i < numberOfUsers; i++) {
    // Create deterministic props for each user
    const id = `${baseId}${i}`
    const password = `${basePassword}${i}`
    const encryptedPassword = await bcrypt.hash(password, 10)
    const username = (Math.random() + 1).toString(36).substring(6)
    const email = `${username}@example.com`

    // Ensure we have a character and rating for the user to rate
    const characterId = i + 1
    const nextCharacterId = characterId + 1
    const value = getRandomRating()

    // Ensure that users with ratings exist in database
    await context.prisma.user.upsert({
      where: {
        id
      },
      create: {
        id,
        email,
        username,
        password: encryptedPassword,
        ratings: {
          connectOrCreate: {
            where: {
              userId_characterId: {
                userId: id,
                characterId
              }
            },
            create: {
              value,
              characterId
            }
          }
        }
      },
      update: {
        id,
        email,
        username,
        ratings: {
          connectOrCreate: {
            where: {
              userId_characterId: {
                userId: id,
                characterId
              }
            },
            create: {
              value,
              characterId
            }
          }
        }
      }
    })

    // Ensure that some users have more ratings than others
    // in order to facilitate sorting by number of ratings
    const nextValue = getRandomRating()
    if (i % 3 === 0) {
      await context.prisma.user.update({
        where: {
          id
        },
        data: {
          ratings: {
            connectOrCreate: {
              where: {
                userId_characterId: {
                  characterId: nextCharacterId,
                  userId: id
                }
              },
              create: {
                characterId: nextCharacterId,
                value: nextValue
              }
            }
          }
        }
      })
    }
  }
  console.log('✅ Successfully populated database with users.')
}

main()
  .catch((error) => {
    console.error(`❌ An error occurred: ${error}`)
    process.exit(1)
  })
  .finally(async () => {
    await context.prisma.$disconnect()
  })
