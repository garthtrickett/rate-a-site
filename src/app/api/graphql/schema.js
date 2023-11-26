import { gql } from 'graphql-tag'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { db } from '../../../drizzle/index.js'
import {
  organisations as organisationsTable,
  professionals as professionalsTable,
  customers as customersTable,
  organisationReviews as organisationReviewsTable,
  professionalReviews as professionalReviewsTable,
  professionalOrganisationMapping as professionalOrganisationMappingTable
} from '../../../drizzle/schema.js'
import { eq, inArray } from 'drizzle-orm'

export const typeDefs = gql`
  type Organisation {
    id: Int!
    name: String!
    professionals: [Professional]
  }

  type Professional {
    id: Int!
    name: String!
    organisations: [Organisation]
  }

  type Customer {
    id: Int!
    name: String!
    organisationReviews: [OrganisationReview]
    professionalReviews: [ProfessionalReview]
  }

  type OrganisationReview {
    id: Int!
    commonReviewFieldsId: Int!
    organisationId: Int!
    commonReviewFields: CommonReviewFields
    customer: Customer
  }

  type ProfessionalReview {
    id: Int!
    commonReviewFieldsId: Int!
    professionalId: Int!
    commonReviewFields: CommonReviewFields
    customer: Customer
  }

  union Review = OrganisationReview | ProfessionalReview

  type CommonReviewFields {
    id: Int!
    customerId: Int!
    rating: Int!
    comments: String!
    review: Review!
  }
  type Query {
    organisations: [Organisation!]!
    professionals: [Professional!]!
    customers: [Customer!]!
    commonReviewFields: [CommonReviewFields!]!
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
  },

  /**
   * @typedef {Object} Organisation
   * @property {number} id - The ID of the organisation.
   * @property {string} name - The name of the organisation.
   * @property {Professional[]} professionals - The professionals in the organisation.
   */
  Organisation: {
    /**
     * @param {Organisation} organisation
     */
    professionals: async organisation => {
      const professionalIds =
        await db.query.professionalOrganisationMapping.findMany({
          columns: {
            professionalId: true
          },
          where: eq(
            professionalOrganisationMappingTable.organisationId,
            organisation.id
          )
        })

      const professionals = db
        .select()
        .from(professionalsTable)
        .where(
          inArray(
            professionalsTable.id,
            professionalIds.map(obj => obj.professionalId)
          )
        )

      return professionals
    }
  },

  /**
   * @typedef {Object} Professional
   * @property {number} id - The ID of the professional.
   * @property {string} name - The name of the professional.
   * @property {Organisation[]} organisations - The organisations the professional is associated with.
   */

  Professional: {
    /**
     * @param {Professional} professional
     */
    organisations: async professional => {
      const organisationIds =
        await db.query.professionalOrganisationMapping.findMany({
          columns: {
            organisationId: true
          },
          where: eq(
            professionalOrganisationMappingTable.professionalId,
            professional.id
          )
        })

      const organisations = db
        .select()
        .from(organisationsTable)
        .where(
          inArray(
            organisationsTable.id,
            organisationIds.map(obj => obj.organisationId)
          )
        )

      return organisations
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
