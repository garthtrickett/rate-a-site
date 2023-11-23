// drizzle/schema.js
import {
  mysqlTable,
  serial,
  timestamp,
  boolean,
  varchar
} from 'drizzle-orm/mysql-core'

export const todos = mysqlTable('todo', {
  id: serial('id'),
  description: varchar('description', { length: 256 }),
  completed: boolean('completed').default(false),
  addedAt: timestamp('added_at').defaultNow()
})
