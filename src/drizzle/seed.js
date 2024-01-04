import { db } from './index'
import {
  organisations,
  professionals,
  professionalOrganisationMapping,
  commonReviewFields,
  organisationReviews,
  professionalReviews,
  customers
} from './schema'

async function seed() {
  // Wipe all rows in the tables
  await db.delete(organisations)
  await db.delete(professionals)
  await db.delete(customers)
  await db.delete(professionalOrganisationMapping)
  await db.delete(commonReviewFields)
  await db.delete(organisationReviews)
  await db.delete(professionalReviews)

  // Insert new rows
  const org = await db.insert(organisations).values({
    name: "Afro Joe's Barbershop"
  })

  const names = [
    'Super Barber 3000',
    'John Sharpe',
    'Edward Scissorhands',
    'Buzzcut Billy',
    'Fade Master Fred',
    'Mohawk Mike'
  ]

  let orgs = []
  orgs.push(org)

  let profs = []
  for (const name of names) {
    const prof = await db.insert(professionals).values({
      name: name
    })
    profs.push(prof)

    await db.insert(professionalOrganisationMapping).values({
      professionalId: Number(prof.insertId),
      organisationId: Number(org.insertId)
    })
  }

  const customerNames = [
    'Curly Q. Cueball',
    'Baldy Locks',
    'Fuzzy Wuzzy',
    'Shaggy Rogers',
    'Runny Nose',
    'Mullet Mania',
    'Ponytail Pete',
    'Bouffant Betty',
    'Dreadlock Dave',
    'Afro Joe'
  ]

  let customers_array = [] // Array to store the customers
  for (const name of customerNames) {
    const cust = await db.insert(customers).values({
      name: name
    })
    customers_array.push(cust) // Store each customer in the array
  }
  // Define a list of made up review strings
  const reviewComments = [
    'Great service!',
    'Very professional.',
    'Would definitely recommend.',
    'Exceeded my expectations.',
    'Could be better.'
    // Add more comments as needed
  ]

  // Define a function to generate a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Iterate over each professional
  for (const prof of profs) {
    // Generate a random number of reviews for each professional (between 1 and 5)
    const numReviews = getRandomInt(1, 5)

    for (let i = 0; i < numReviews; i++) {
      // Pick a random customer
      const cust = customers_array[getRandomInt(0, customers_array.length - 1)]

      // Pick a random review comment
      const comment = reviewComments[getRandomInt(0, reviewComments.length - 1)]

      // Create a commonReview with the random comment and a random rating
      const commonReview = await db.insert(commonReviewFields).values({
        rating: getRandomInt(1, 5), // Random rating between 1 and 5
        comments: comment
      })

      // Insert a professionalReview
      await db.insert(professionalReviews).values({
        commonReviewFieldsId: Number(commonReview.insertId),
        professionalId: Number(prof.insertId),
        customerId: Number(cust.insertId)
      })
    }
  }

  // Iterate over each organisation
  for (const org of orgs) {
    // Generate a random number of reviews for each organisation (between 1 and 5)
    const numReviews = getRandomInt(1, 5)

    for (let i = 0; i < numReviews; i++) {
      // Pick a random customer
      const cust = customers_array[getRandomInt(0, customers_array.length - 1)]

      // Pick a random review comment
      const comment = reviewComments[getRandomInt(0, reviewComments.length - 1)]

      // Create a commonReview with the random comment and a random rating
      const commonReview = await db.insert(commonReviewFields).values({
        rating: getRandomInt(1, 5), // Random rating between 1 and 5
        comments: comment
      })

      // Insert an organisationReview
      await db.insert(organisationReviews).values({
        commonReviewFieldsId: Number(commonReview.insertId),
        organisationId: Number(org.insertId),
        customerId: Number(cust.insertId)
      })
    }
  }
}

seed()
  .then(() => console.log('Seeding completed'))
  .catch(error => console.error('Seeding failed:', error))
