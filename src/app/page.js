'use client'
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
import { log } from 'next-axiom'
export const runtime = 'edge' // 'nodejs' is the default

log.debug('Login attempt', { user: 'j_doe', status: 'success' }) // results in {"message": "Login attempt", "fields": {"user": "j_doe", "status": "success"}}
log.info('Payment completed', { userID: '123', amount: '25USD' })
log.warn('API rate limit exceeded', {
  endpoint: '/users/1',
  rateLimitRemaining: 0
})
log.error('System Error', { code: '500', message: 'Internal server error' })

const QUERY = gql`
  query getTodos {
    todos {
      id
      description
      completed
    }
  }
`

export const dynamic = 'force-dynamic'

export default function Page() {
  const { data } = useSuspenseQuery(QUERY)
  console.log(data)

  return <div> hello</div>
}
