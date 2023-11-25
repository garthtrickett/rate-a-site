import { gql } from 'graphql-tag'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { db } from '../../../drizzle/index.js'
import {
  organisations as organisationsTable,
  professionals as professionalsTable,
  customers as customersTable,
  organisationReviews as organisationReviewsTable,
  professionalReviews as professionalReviewsTable
} from '../../../drizzle/schema.js'

export const typeDefs = gql`
  type Organisation {
    id: Int!
    name: String!
  }

  type Professional {
    id: Int!
    name: String!
    organisationId: Int!
  }

  type Customer {
    id: Int!
    name: String!
  }

  type OrganisationReview {
    id: Int!
    customerId: Int!
    organisationId: Int!
    rating: Int!
    comments: String!
  }

  type ProfessionalReview {
    id: Int!
    customerId: Int!
    professionalId: Int!
    rating: Int!
    comments: String!
  }

  type Query {
    organisations: [Organisation!]!
    professionals: [Professional!]!
    customers: [Customer!]!
    organisationReviews: [OrganisationReview!]!
    professionalReviews: [ProfessionalReview!]!
  }
`

export const resolvers = {
  Query: {
    organisations: async () => {
      const organisations = await db.select().from(organisationsTable)
      return organisations
    },
    professionals: async () => {
      const professionals = await db.select().from(professionalsTable)
      return professionals
    },
    customers: async () => {
      const customers = await db.select().from(customersTable)
      return customers
    },
    organisationReviews: async () => {
      const organisationReviews = await db
        .select()
        .from(organisationReviewsTable)
      return organisationReviews
    },
    professionalReviews: async () => {
      const professionalReviews = await db
        .select()
        .from(professionalReviewsTable)
      return professionalReviews
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
