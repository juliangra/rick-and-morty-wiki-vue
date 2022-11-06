import { context } from '../../context'
import { AuthResponse } from '../../types/auth'

/**
 * Validates if username is valid and whether it is already in use.
 *
 * @param username is the provided username from user
 * @returns true if username is valid and not in use, false otherwise.
 */
const isValidUsername = async (username: string): Promise<AuthResponse> => {
  if (username.length < 2) {
    return { ok: false, error: 'Username must be at least 2 characters long.' }
  }

  const usernameExists = await context.prisma.user.findFirst({
    where: {
      username: {
        equals: username
      }
    }
  })

  if (usernameExists) {
    return {
      ok: false,
      error: 'Username is already in use.'
    }
  }

  return { ok: true }
}

export default isValidUsername
