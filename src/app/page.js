'use client'
import React from 'react'

import { gql } from 'graphql-tag'

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
export const dynamic = 'force-dynamic'

const query = gql`
  query Query {
    getPosts {
      id
    }
  }
`

export default function Home() {
  const { data } = useSuspenseQuery(query)
  return <div>{data.getPosts[0].id}</div>
}
