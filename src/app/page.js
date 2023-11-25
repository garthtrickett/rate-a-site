'use client'
import React from 'react'
import { useLogger } from 'next-axiom'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
import { UserButton } from '@clerk/nextjs'
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
  log.debug('Component Log Example', { userId: 42 })
  console.log(data)

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
