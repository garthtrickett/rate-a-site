import { withAxiom } from 'next-axiom'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { schema } from './schema'

// export const runtime = 'edge' // 'nodejs' is the default

const server = new ApolloServer({
  schema
})

const handler = startServerAndCreateNextHandler(server)

export const GET = withAxiom(req => {
  return handler(req)
})

export const POST = GET
