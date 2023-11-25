import { db } from './index.js'
import {
  organisations,
  professionals,
  customers,
  organisationReviews,
  professionalReviews
} from './schema.js'

async function seed() {
  // Wipe all rows in the tables
  await db.delete(organisations)
  await db.delete(professionals)
  await db.delete(customers)
  await db.delete(organisationReviews)
  await db.delete(professionalReviews)

  // Insert new rows
  await db.insert(organisations).values({
    name: 'Your organisation name'
  })

  await db.insert(professionals).values({
    name: 'Your professional name',
    organisationId: 1 // assuming the organisation with id 1 exists
  })

  await db.insert(customers).values({
    name: 'Your customer name'
  })

  await db.insert(organisationReviews).values({
    customerId: 1, // assuming the customer with id 1 exists
    organisationId: 1, // assuming the organisation with id 1 exists
    rating: 5,
    comments: 'Your review comments'
  })

  await db.insert(professionalReviews).values({
    customerId: 1, // assuming the customer with id 1 exists
    professionalId: 1, // assuming the professional with id 1 exists
    rating: 5,
    comments: 'Your review comments'
  })
}

seed()
  .then(() => console.log('Seeding completed'))
  .catch(error => console.error('Seeding failed:', error))
