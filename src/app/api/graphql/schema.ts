import { gql } from 'graphql-tag'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { db } from '../../../drizzle/index'
import {
  organisations as organisationsTable,
  professionals as professionalsTable,
  customers as customersTable,
  organisationReviews as organisationReviewsTable,
  professionalReviews as professionalReviewsTable,
  professionalOrganisationMapping as professionalOrganisationMappingTable
} from '../../../drizzle/schema'
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

// Define the types based on the JSDoc comments
interface Organisation {
  id: number
  name: string
  professionals: Professional[]
}

interface Professional {
  id: number
  name: string
  organisations: Organisation[]
}

export const resolvers = {
  Query: {
    organisation: async (_: any, { id }: { id: number }) => {
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
  Organisation: {
    professionals: async (organisation: Organisation) => {
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
  Professional: {
    organisations: async (professional: Professional) => {
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
    addProfessionalToOrganisation: async (
      _: any,
      { name, organisationId }: { name: string; organisationId: number }
    ) => {
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
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
