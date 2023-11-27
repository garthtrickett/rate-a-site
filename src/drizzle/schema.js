// drizzle/schema.js
import {
  mysqlTable,
  serial,
  varchar,
  int,
  primaryKey
} from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'

export const organisations = mysqlTable('organisation', {
  id: serial('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 })
  // add other fields as necessary
})

export const professionals = mysqlTable('professional', {
  id: serial('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 })
  // add other fields as necessary
})

export const professionalOrganisationMapping = mysqlTable(
  'professionalOrganisationMapping',
  {
    professionalId: int('professionalId').notNull(),
    organisationId: int('organisationId').notNull()
  },
  t => ({
    pk: primaryKey({ columns: [t.professionalId, t.organisationId] })
  })
)

export const professionalOrganisationMappingRelations = relations(
  professionalOrganisationMapping,
  ({ one }) => ({
    professional: one(professionals, {
      fields: [professionalOrganisationMapping.professionalId],
      references: [professionals.id]
    }),
    organisation: one(organisations, {
      fields: [professionalOrganisationMapping.organisationId],
      references: [organisations.id]
    })
  })
)

// Mapping from the individual tablex to the join table
export const professionalsRelations = relations(professionals, ({ many }) => ({
  professionalOrganisationMappings: many(professionalOrganisationMapping)
}))

export const organisationsRelations = relations(organisations, ({ many }) => ({
  professionalOrganisationMappings: many(professionalOrganisationMapping)
}))

export const customers = mysqlTable('customer', {
  id: serial('id'),
  name: varchar('name', { length: 256 })
  // add other fields as necessary
})

export const customersRelations = relations(customers, ({ many }) => ({
  organisationReviews: many(organisationReviews),
  professionalReviews: many(professionalReviews)
}))

export const commonReviewFields = mysqlTable('commonReviewFields', {
  id: serial('id').primaryKey().autoincrement(),
  rating: int('rating'),
  comments: varchar('comments', { length: 1024 })
})

export const organisationReviews = mysqlTable('organisationReview', {
  id: serial('id').primaryKey().autoincrement(),
  commonReviewFieldsId: int('commonReviewFieldsId'),
  organisationId: int('organisationId'),
  customerId: int('customerId')
})

export const professionalReviews = mysqlTable('professionalReview', {
  id: serial('id').primaryKey().autoincrement(),
  professionalId: int('professionalId'),
  commonReviewFieldsId: int('commonReviewFieldsId'),
  customerId: int('customerId')
})

export const commonReviewFieldsRelations = relations(
  commonReviewFields,
  ({ one }) => ({
    organisationReview: one(organisationReviews, {
      fields: [commonReviewFields.id],
      references: [organisationReviews.commonReviewFieldsId]
    }),
    professionalReview: one(professionalReviews, {
      fields: [commonReviewFields.id],
      references: [professionalReviews.commonReviewFieldsId]
    })
  })
)

export const organisationReviewsRelations = relations(
  organisationReviews,
  ({ one }) => ({
    commonReviewFields: one(commonReviewFields, {
      fields: [organisationReviews.commonReviewFieldsId],
      references: [commonReviewFields.id]
    }),
    customer: one(customers, {
      fields: [organisationReviews.commonReviewFieldsId],
      references: [customers.id]
    })
  })
)

export const professionalReviewsRelations = relations(
  professionalReviews,
  ({ one }) => ({
    commonReviewFields: one(commonReviewFields, {
      fields: [professionalReviews.commonReviewFieldsId],
      references: [commonReviewFields.id]
    }),
    customer: one(customers, {
      fields: [professionalReviews.commonReviewFieldsId],
      references: [customers.id]
    })
  })
)
