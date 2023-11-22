import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { schema } from './schema'

const server = new ApolloServer({
  schema
})

const handler = startServerAndCreateNextHandler(server)

/**
 * @param {Request} request
 */
export async function GET(request) {
  return handler(request)
}

/**
 * @param {Request} request
 */
export async function POST(request) {
  return handler(request)
}