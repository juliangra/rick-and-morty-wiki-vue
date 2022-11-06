import run from '@rollup/plugin-run'
import typescript from '@rollup/plugin-typescript'

const dev = process.env.NODE_ENV !== 'production'

export default {
  input: 'src/app.ts',
  output: {
    file: 'dist/app.js',
    format: 'esm'
  },
  plugins: [dev && run(), typescript()],
  external: [
    'express',
    'dotenv',
    'express-graphql',
    'graphql',
    '@graphql-tools/schema',
    '@prisma/client',
    'graphql-tag',
    '@graphql-tools/load',
    '@graphql-tools/stitch',
    '@graphql-tools/url-loader',
    '@graphql-tools/graphql-file-loader',
    'cors',
    'jsonwebtoken',
    'bcrypt'
  ]
}
