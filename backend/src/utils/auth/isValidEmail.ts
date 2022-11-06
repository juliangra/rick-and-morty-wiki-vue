import { context } from '../../context'
import { AuthResponse } from '../../types/auth'

/**
 * Validates an email address using a regular expression.
 *
 * Inspired by https://stackoverflow.com/a/46181.
 *
 * @param email is the provided email.
 * @returns a boolean indicating whether the email is valid.
 */
const validateEmail = (email: string) =>
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

/**
 * Validates if email is valid and whether it is already in use.
 *
 * @param email is the provided email address from user
 * @returns true if email is valid and not in use, false otherwise
 */
const isValidEmail = async (email: string): Promise<AuthResponse> => {
  if (!validateEmail(email)) return { ok: false, error: 'Invalid email.' }

  const emailExists = await context.prisma.user.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  })

  if (emailExists) {
    return { ok: false, error: 'Email is already in use.' }
  }

  return { ok: true }
}

export default isValidEmail
