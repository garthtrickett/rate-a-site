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
import { eq, inArray, and } from 'drizzle-orm'

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
    organisation(id: Int!): Organisation
    professionals: [Professional!]!
    customers: [Customer!]!
    commonReviewFields: [CommonReviewFields!]!
    organisationReviews: [OrganisationReview!]!
    professionalReviews: [ProfessionalReview!]!
  }
  type Mutation {
    addProfessionalToOrganisation(
      name: String!
      organisationId: Int!
    ): Organisation
    removeProfessionalFromOrganisation(
      professionalId: Int!
      organisationId: Int!
    ): Organisation
  }
`

export const resolvers = {
  Query: {
    /**
     * @param {any} _
     * @param {Object} variables
     * @param {number} variables.id
     */
    organisation: async (_, { id }) => {
      const organisation = await db.query.organisations.findMany({
        where: eq(organisationsTable.id, id)
      })
      return organisation[0]
    },
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
  },
  Mutation: {
    /**
     * @param {any} _
     * @param {Object} args - The arguments passed to the mutation.
     * @param {string} args.name - The name of the professional to be added.
     * @param {number} args.organisationId - The ID of the organisation to which the professional is to be added.
     */
    addProfessionalToOrganisation: async (_, { name, organisationId }) => {
      // Create a new professional
      const professional = await db.insert(professionalsTable).values({
        name
      })

      await db.insert(professionalOrganisationMappingTable).values({
        professionalId: Number(professional.insertId),
        organisationId
      })

      // Fetch the updated organisation
      const [organisation] = await db.query.organisations.findMany({
        where: eq(organisationsTable.id, organisationId)
      })

      return organisation
    },
    /**
     * @param {any} _
     * @param {Object} args - The arguments passed to the mutation.
     * @param {number} args.professionalId - The ID of the professional to be removed.
     * @param {number} args.organisationId - The ID of the organisation from which the professional is to be removed.
     */
    removeProfessionalFromOrganisation: async (
      _,
      { professionalId, organisationId }
    ) => {
      // Remove the mapping between the professional and the organisation
      await db
        .delete(professionalOrganisationMappingTable)
        .where(
          and(
            eq(
              professionalOrganisationMappingTable.professionalId,
              professionalId
            ),
            eq(
              professionalOrganisationMappingTable.organisationId,
              organisationId
            )
          )
        )

      // Fetch the updated organisation
      const [organisation] = await db.query.organisations.findMany({
        where: eq(organisationsTable.id, organisationId)
      })

      return organisation
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
