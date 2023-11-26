import type { Config } from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const config: Config = {
  schema: './src/drizzle/schema.js',
  out: './src/db/migrations', // specify the output directory for migrations
  dbCredentials: {
    uri: process.env.DATABASE_URL as string
  },
  driver: 'mysql2'
}

export default config
