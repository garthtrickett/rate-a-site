import { gql } from 'graphql-tag'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { db } from '../../../drizzle/index.js'
import { todos as todosTable } from '../../../drizzle/schema.js'

export const typeDefs = gql`
  type Todo {
    id: Int!
    description: String!
    completed: Boolean!
  }
  type Query {
    todos: [Todo!]!
  }
`

export const resolvers = {
  Query: {
    todos: async () => {
      // Fetch data from the database
      const todos = await db.select().from(todosTable)

      return todos
      // Convert the data to the format expected by your GraphQL schema
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
