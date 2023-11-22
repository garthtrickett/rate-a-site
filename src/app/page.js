'use client'
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'

const QUERY = gql`
  query dynamicProducts {
    products {
      id
      title
    }
  }
`

export const dynamic = 'force-dynamic'

export default function Page() {
  const { data } = useSuspenseQuery(QUERY)
  console.log(data)

  return <div> hello</div>
}
