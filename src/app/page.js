'use client'
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
// import { log } from 'next-axiom' // Use this for logging that happens outside a component
// import { useLogger } from 'next-axiom'
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
  // const log = useLogger()
  // log.debug('User logged in', { userId: 42 })
  console.log(data)

  return <div> hello</div>
}
