'use client'
import React from 'react'
import { useLogger } from 'next-axiom'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
export const runtime = 'edge' // 'nodejs' is the default

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
  const log = useLogger()
  log.debug('User logged in', { userId: 42 })
  console.log(data)

  return <div> hello</div>
}
