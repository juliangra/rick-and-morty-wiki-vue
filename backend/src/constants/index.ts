export const JWT_SECRET = process.env.JWT_SECRET || 'not_very_secret'

/**
 * The number of characters to use in each page of paginated results.
 */
export const CURSOR_OFFSET = 20

/**
 * The fallback page number to use if none is specified.
 */
export const START_PAGE = 1

export const JSON_FILE_PATH = './db/static/characters.json'
