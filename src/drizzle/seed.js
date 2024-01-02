import { db } from './index'
import {
  organisations,
  professionals,
  professionalOrganisationMapping,
  customers,
  commonReviewFields,
  organisationReviews,
  professionalReviews
} from './schema'

async function seed() {
  // Wipe all rows in the tables
  await db.delete(organisations)
  await db.delete(professionals)
  await db.delete(professionalOrganisationMapping)
  await db.delete(customers)
  await db.delete(commonReviewFields)
  await db.delete(organisationReviews)
  await db.delete(professionalReviews)

  // Insert new rows
  const org = await db.insert(organisations).values({
    name: 'Your organisation name'
  })

  const names = ['Super Barber 3000', 'John Sharpe', 'Edward Scissorhands'] // Add more names as needed

  for (const name of names) {
    const prof = await db.insert(professionals).values({
      name: name
    })

    await db.insert(professionalOrganisationMapping).values({
      professionalId: Number(prof.insertId),
      organisationId: Number(org.insertId)
    })
  }

  const cust = await db.insert(customers).values({
    name: 'Your customer name'
  })

  const commonReview = await db.insert(commonReviewFields).values({
    rating: 5,
    comments: 'Your review comments'
  })

  await db.insert(organisationReviews).values({
    commonReviewFieldsId: Number(commonReview.insertId),
    organisationId: Number(org.insertId),
    customerId: Number(cust.insertId)
  })

  // await db.insert(professionalReviews).values({
  //   commonReviewFieldsId: Number(commonReview.insertId),
  //   professionalId: Number(prof.insertId),
  //   customerId: Number(cust.insertId)
  // })
}

seed()
  .then(() => console.log('Seeding completed'))
  .catch(error => console.error('Seeding failed:', error))
