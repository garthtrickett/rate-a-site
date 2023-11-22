import type { Config } from 'drizzle-kit'

console.log(process.env.DATABASE_URL)

const config: Config = {
  schema: './src/lib/schema.js',
  dbCredentials: {
    uri: 'mysql://2ptt99cds49ak5tvp1x0:pscale_pw_OXhSiSUjP33kznsvjvPDegA6poTixfkj0BtFwTHf8Is@aws.connect.psdb.cloud/hair-review?ssl={"rejectUnauthorized":true}'
  },
  driver: 'mysql2'
}

export default config
