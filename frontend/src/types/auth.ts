export type DecodedToken = {
  iat: number
  id: string
  username: string
}

export type Severity = 'success' | 'warning' | 'error' | 'info'
