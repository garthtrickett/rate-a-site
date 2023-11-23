// src/drizzle/seed.js
import { db } from './index.js'
import { todos } from './schema.js'

async function seed() {
  await db.insert(todos).values({
    description: 'Your todo description',
    completed: false
  })
}

seed()
  .then(() => console.log('Seeding completed'))
  .catch(error => console.error('Seeding failed:', error))
