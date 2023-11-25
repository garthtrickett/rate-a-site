// drizzle/schema.js
import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core'

export const organisations = mysqlTable('organisation', {
  id: serial('id'),
  name: varchar('name', { length: 256 })
  // add other fields as necessary
})

export const professionals = mysqlTable('professional', {
  id: serial('id'),
  name: varchar('name', { length: 256 }),
  organisationId: int('organisationId')
  // add other fields as necessary
})

export const customers = mysqlTable('customer', {
  id: serial('id'),
  name: varchar('name', { length: 256 })
  // add other fields as necessary
})

export const organisationReviews = mysqlTable('organisationReview', {
  id: serial('id'),
  customerId: int('customerId'),
  organisationId: int('organisationId'),
  rating: int('rating'),
  comments: varchar('comments', { length: 1024 })
  // add other fields as necessary
})

export const professionalReviews = mysqlTable('professionalReview', {
  id: serial('id'),
  customerId: int('customerId'),
  professionalId: int('professionalId'),
  rating: int('rating'),
  comments: varchar('comments', { length: 1024 })
  // add other fields as necessary
})
